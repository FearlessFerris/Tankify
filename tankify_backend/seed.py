# Seed File Implementation 


# Dependencies
import requests
from datetime import datetime, timezone
from dotenv import load_dotenv
import os 
from io import BytesIO
from PIL import Image, ImageOps 


# Necessary Files 
from app import app, db
from models import User, Tank, Transaction, Currency, PaymentMethod


# Load Environmental Variables 
load_dotenv()
WG_API_KEY = os.getenv( 'WG_API_KEY' )


# s3 Bucket Information 
from s3_utils import BUCKET_NAME, get_s3_client


# Base URL's 
WOT_CDN_BASE = 'https://na-wotp.wgcdn.co/dcont/tankopedia_images/'


# Image Processing 
ENABLE_IMAGE_PROCESSING = False 


def clear_database():
    """Drops existing tables if they exist and recreates them."""
    print("Dropping existing database tables if they exist...")
    with app.app_context():
        db.drop_all()
        db.create_all()
    print("Database clearing has completed!")


def seed_currencies():
    """Seeds the Currencies table with the most common currencies."""
    currencies_data = [
        {"iso": "USD", "name": "United States Dollar", "symbol": "$", "exchange_rate": 1.0, "country": "United States", "is_active": True, "description": "The official currency of the United States"},
        {"iso": "EUR", "name": "Euro", "symbol": "€", "exchange_rate": 0.85, "country": "Eurozone", "is_active": True, "description": "The official currency of the Eurozone"},
        {"iso": "JPY", "name": "Japanese Yen", "symbol": "¥", "exchange_rate": 110.0, "country": "Japan", "is_active": True, "description": "The official currency of Japan"},
        {"iso": "GBP", "name": "British Pound", "symbol": "£", "exchange_rate": 0.75, "country": "United Kingdom", "is_active": True, "description": "The official currency of the United Kingdom"},
        {"iso": "AUD", "name": "Australian Dollar", "symbol": "A$", "exchange_rate": 1.3, "country": "Australia", "is_active": True, "description": "The official currency of Australia"},
        {"iso": "CAD", "name": "Canadian Dollar", "symbol": "C$", "exchange_rate": 1.25, "country": "Canada", "is_active": True, "description": "The official currency of Canada"},
        {"iso": "CHF", "name": "Swiss Franc", "symbol": "CHF", "exchange_rate": 0.92, "country": "Switzerland", "is_active": True, "description": "The official currency of Switzerland"},
        {"iso": "CNY", "name": "Chinese Yuan", "symbol": "¥", "exchange_rate": 6.45, "country": "China", "is_active": True, "description": "The official currency of China"},
        {"iso": "SEK", "name": "Swedish Krona", "symbol": "kr", "exchange_rate": 8.6, "country": "Sweden", "is_active": True, "description": "The official currency of Sweden"},
        {"iso": "NZD", "name": "New Zealand Dollar", "symbol": "NZ$", "exchange_rate": 1.4, "country": "New Zealand", "is_active": True, "description": "The official currency of New Zealand"},
        { "iso": 'GOLD', 'name': 'Gold', 'symbol': 'G', 'exchange_rate': 0, 'country': 'InGame', 'is_active': True, 'description': 'Premium in-game currency' },
        { 'iso': 'CRED', 'name': 'Credits', 'symbol': 'Cr', 'exchange_rate': 0, 'country': 'InGame', 'is_active': True, 'description': 'Basic in-game currency' },
    ]

    currencies = [Currency(**currency_data) for currency_data in currencies_data]
    db.session.add_all(currencies)
    db.session.commit()
    print(f"Seeded {len(currencies)} currencies to the database!")
    return currencies


def seed_users(currencies):
    """Seeds the Users table with initial mock data."""
    users = [
        User(username='Jack Sparrow', password='IamAsuperSecretPassword', email='jacksparrow@thesevenseas.org', image='https://lumiere-a.akamaihd.net/v1/images/bluesteel_d0f846ee.jpeg'),
        User(username='Lara Croft', password='AnotherSecretPassword', email='lara.croft@tombraider.com', image='https://example.com/lara_croft_image.png'),
        User( username = 'Terminator', password = 'atheman1', email = 'savesarahconnor@cyberdyne.com', image = 'https://img.goodfon.com/wallpaper/big/1/aa/terminator-2-judgment-day.webp' )
    ]
    
    # Assign default currencies
    users[0].default_currency_id = currencies[0].id 
    users[1].default_currency_id = currencies[1].id 
    users[2].default_currency_id = currencies[0].id

    # Set Global Default Currency for a User
    print( f'Setting Terminators default currency to USD' )
    result = Currency.set_default_global_currency( currencies[ 0 ].id, users[ 2 ].id ) 
    print( result )

    db.session.add_all(users)
    db.session.commit()
    return users


def crop_image_auto(image_url, upload_path):
    """Fetches an image from a URL, crops whitespace, resizes canvas, and uploads to S3."""

    try:
        response = requests.get(image_url, allow_redirects=True)
        response.raise_for_status()
        image = Image.open(BytesIO(response.content))

        if image.mode != "RGBA":
            image = image.convert("RGBA")

        bbox = image.getbbox()
        if bbox:
            cropped_image = image.crop(bbox)
        else:
            print(f"Image at {image_url} appears to be completely white or transparent. Skipping...")
            return None

        buffer = BytesIO()
        cropped_image.save(buffer, format="PNG")
        buffer.seek(0)

        s3 = get_s3_client()
        s3_key = f"{upload_path}/{os.path.basename(image_url)}"
        s3.upload_fileobj(buffer, BUCKET_NAME, s3_key, ExtraArgs={"ContentType": "image/png"})

        s3_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{s3_key}"
        print(f"Successfully uploaded cropped and resized image for {os.path.basename(image_url)} to {s3_url}")
        return s3_url

    except Exception as e:
        print(f"Error processing image from {image_url}: {e}")
        return None


# Capitalize Nations 
def capitalize_nation( nation ):
    """ Capitalizes Nation if Acronym """

    if len( nation ) in ( 2, 3, 4 ):
        return nation.upper() 

    return nation.capitalize()

def seed_tanks():
    """Seeds the Tanks table with data from World of Tanks API."""

    print("Fetching tank data from World of Tanks API...")
    try:
        response = requests.get(
            "https://api.worldoftanks.com/wot/encyclopedia/vehicles/",
            params={"application_id": os.getenv("WG_API_KEY")},
        )
        response.raise_for_status()
        tank_data = response.json()

        flag_base_url = "https://tankify-images.s3.amazonaws.com/flags/"
        flag_hd_base_url = "https://tankify-images.s3.amazonaws.com/flags-hd/"
        nation_flag_urls = {
            "ussr": f"{flag_base_url}ussr_flag.png",
            "germany": f"{flag_base_url}germany_flag.png",
            "usa": f"{flag_base_url}usa_flag.png",
            "china": f"{flag_base_url}china_flag.png",
            "france": f"{flag_base_url}france_flag.png",
            "uk": f"{flag_base_url}uk_flag.png",
            "japan": f"{flag_base_url}japan_flag.png",
            "czech": f"{flag_base_url}czech_flag.png",
            "sweden": f"{flag_base_url}sweden_flag.png",
            "poland": f"{flag_base_url}poland_flag.png",
            "italy": f"{flag_base_url}italy_flag.png",
        }
        nation_flag_hd_urls = {
            "ussr": f"{flag_hd_base_url}ussr.png",
            "germany": f"{flag_hd_base_url}germany.png",
            "usa": f"{flag_hd_base_url}usa.png",
            "china": f"{flag_hd_base_url}china.png",
            "france": f"{flag_hd_base_url}france.png",
            "uk": f"{flag_hd_base_url}uk.png",
            "japan": f"{flag_hd_base_url}japan.png",
            "czech": f"{flag_hd_base_url}czech.png",
            "sweden": f"{flag_hd_base_url}sweden.png",
            "poland": f"{flag_hd_base_url}poland.png",
            "italy": f"{flag_hd_base_url}italy.png",
        }

        tanks = []
        upload_path = "tank_images"

        if "data" in tank_data:
            for tank_id, tank in tank_data["data"].items():
                if "tag" in tank and "name" in tank:
                    image_url = f"https://na-wotp.wgcdn.co/dcont/tankopedia_images/{tank['tag'].lower()}/{tank['tag'].lower()}_image.png"
                    cropped_image_url = crop_image_auto(image_url, upload_path) if ENABLE_IMAGE_PROCESSING else f"https://{BUCKET_NAME}.s3.amazonaws.com/{upload_path}/{os.path.basename(image_url)}"

                    nation = capitalize_nation(tank.get("nation", "unknown"))
                    nation_flag_hd_url = nation_flag_hd_urls.get(nation.lower(), f"{flag_hd_base_url}default.png")
                    if tank.get( 'price_gold' ) != 0 and tank.get( 'price_gold' ) is not None: 
                        price = tank.get( 'price_gold', 0 )
                    else:
                        price = tank.get( 'price_credit', 0 )
                    if price is None:
                        price = 1000000
                    if cropped_image_url:
                        tanks.append(
                            Tank(
                                name=tank["name"],
                                tag=tank["tag"],
                                description=tank.get("description", "No description available"),
                                price=price,
                                vehicle_type=tank.get("type", "Unknown"),
                                tier=tank.get("tier", "Unknown"),
                                type=tank.get("type", "Unknown"),
                                nation=capitalize_nation( tank.get( 'nation', 'Unknown' ) ),
                                nation_flag=nation_flag_urls.get(tank.get("nation", "unknown")),
                                nation_flag_hd = nation_flag_hd_url,
                                image=cropped_image_url,
                                crew=tank.get("crew", {}),
                                default_profile=tank.get("default_profile", {}),
                                guns=tank.get("guns", {}),
                                modules_tree=tank.get("modules_tree", {}),
                                next_tanks=tank.get("next_tanks", {}),
                                radios=tank.get("radios", {}),
                                suspensions=tank.get("suspensions", {}),
                                turrets=tank.get("turrets", {}),
                            )
                        )

        if tanks:
            db.session.add_all(tanks)
            db.session.commit()
            print(f"{len(tanks)} tanks successfully added to the database.")

        return tanks

    except requests.RequestException as e:
        print(f"Error fetching tank data: {e}")

        return []

def seed_payment_methods( users ): 
    """ Seeds the PaymentMethods table with mock data """

    if not users: 
        print( f'Skipping payment_method seeding due to missing users' )
    
    payment_methods = [ 
        PaymentMethod( 
            user_id = users[ 0 ].id, 
            cardholder_name= 'James May',
            card_number='89828281',
            expiry='9/21',
            cvv = '926',
            type = 'debit',
            details = '',
            default_method=False,
        ),

        PaymentMethod( 
            user_id = users[ 0 ].id, 
            cardholder_name = 'Richard Hammond', 
            card_number='09837861',
            expiry='10/8',
            cvv = '910', 
            type = 'credit',
            details = 'This is the Hammonds best card for purchases',
            default_method = True, 
        ),
    ]

    db.session.add_all( payment_methods )
    db.session.commit()
    print( f'Seeded { len( payment_methods )} payment_methods to the database' )
    

def seed_transactions(users, tanks):
    """Seeds the Transactions table with mock data."""

    if not users or not tanks:
        print("Skipping transaction seeding due to missing users or tanks.")
        return

    payment_methods = PaymentMethod.query.filter(PaymentMethod.user_id == users[0].id).all()
    payment_method_id = payment_methods[0].id if payment_methods else None

    transactions = [
        Transaction(
            user_id=users[0].id, 
            payment_source="in_app_credit",
            transaction_purpose = 'purchase',
            amount=59.99, 
            payment_method_id=payment_method_id,
        ),

        Transaction(
            user_id=users[1].id, 
            payment_source = 'in_app_gold',
            transaction_purpose = 'purchase', 
            amount=tanks[1].price, 
            payment_method_id=None,
        ),

        Transaction( 
            user_id = users[0].id,
            payment_source = 'credit_card',
            transaction_purpose = 'purchase',
            amount = 29.99,
            payment_method_id = None,
        ),

        Transaction(
            user_id=users[2].id, 
            payment_source = "debit_card",
            transaction_purpose = 'purchase', 
            amount=102.99, 
            payment_method_id=None,
        ),
    ]

    db.session.add_all(transactions)
    db.session.commit()
    print(f"Seeded {len(transactions)} transactions to the database!")


def seed_database():
    """Calls all individual seeding functions."""
    
    print('Seeding database with initial data...')
    with app.app_context():
        try:
            clear_database()
            currencies = seed_currencies()
            users = seed_users(currencies)
            tanks = seed_tanks()
            if users:
                seed_payment_methods( users )
                if tanks:
                    seed_transactions(users, tanks)
            else:
                print("Skipping transaction seeding due to missing users or tanks.")

            print('Seed data successfully added!')

        except Exception as e:
            print(f"Error occurred while seeding data: {e}")
            db.session.rollback()

if __name__ == "__main__":
    seed_database()