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
from models import User, Tank, Transaction


# Load Environmental Variables 
load_dotenv()
WG_API_KEY = os.getenv( 'WG_API_KEY' )

# s3 Bucket Information 
from s3_utils import BUCKET_NAME, get_s3_client


# Base URL's 
WOT_CDN_BASE = 'https://na-wotp.wgcdn.co/dcont/tankopedia_images/'


# Image Processing 
ENABLE_IMAGE_PROCESSING = False 


# Define the clear_database function
def clear_database():
    """ Drops Existing Tables if Exist & Creates Fresh based on Models """

    print('Dropping existing database tables if they exist...')
    with app.app_context():
        db.drop_all()
        db.create_all()
    print('Database clearing has completed!')

# Seed Users
def seed_users():
    """Seeds the Users table with initial mock data."""
    users = [
        User(username='Jack Sparrow', password='IamAsuperSecretPassword', email='jacksparrow@thesevenseas.org', image='https://lumiere-a.akamaihd.net/v1/images/bluesteel_d0f846ee.jpeg'),
        User(username='Lara Croft', password='AnotherSecretPassword', email='lara.croft@tombraider.com', image='https://example.com/lara_croft_image.png')
    ]
    db.session.add_all(users)
    db.session.commit()
    return users


# Seed Tanks
def crop_image_auto(image_url, upload_path):
    """Fetches an image from a URL, crops whitespace, resizes canvas, and uploads to S3."""
    try:
        # Fetch the image
        response = requests.get(image_url, allow_redirects=True)
        response.raise_for_status()

        # Open the image
        image = Image.open(BytesIO(response.content))

        # Convert to RGBA to handle transparency or non-white backgrounds
        if image.mode != "RGBA":
            image = image.convert("RGBA")

        # Find the bounding box of non-transparent or non-white pixels
        bbox = image.getbbox()
        if bbox:
            cropped_image = image.crop(bbox)  # Crop to bounding box
        else:
            print(f"Image at {image_url} appears to be completely white or transparent. Skipping...")
            return None

        # Save the cropped image to an in-memory buffer
        buffer = BytesIO()
        cropped_image.save(buffer, format="PNG")  # Save as PNG to preserve transparency
        buffer.seek(0)

        # Upload to S3
        s3 = get_s3_client()
        s3_key = f"{upload_path}/{os.path.basename(image_url)}"
        s3.upload_fileobj(buffer, BUCKET_NAME, s3_key, ExtraArgs={"ContentType": "image/png"})

        # Log successful upload
        s3_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{s3_key}"
        print(f"Successfully uploaded cropped and resized image for {os.path.basename(image_url)} to {s3_url}")

        # Return the S3 URL
        return s3_url

    except Exception as e:
        print(f"Error processing image from {image_url}: {e}")
        return None  # Return None for failed processing


# Capitalize Nations 
def capitalize_nation( nation ):
    """ Capitalizes Nation if Acronym """

    if len( nation ) in ( 2, 3, 4 ):
        return nation.upper() 

    return nation.capitalize()


def seed_tanks():
    """Seeds the Tanks table with data from World of Tanks API and optionally uploads cropped images."""
    print('Fetching tank data from World of Tanks API...')
    try:
        response = requests.get(
            'https://api.worldoftanks.com/wot/encyclopedia/vehicles/',
            params={'application_id': os.getenv("WG_API_KEY")}
        )
        response.raise_for_status()
        tank_data = response.json()

        flag_base_url = "https://tankify-images.s3.amazonaws.com/flags/"
        nation_flag_urls = {
            'ussr': f"{flag_base_url}ussr_flag.png",
            'germany': f"{flag_base_url}germany_flag.png",
            'usa': f"{flag_base_url}usa_flag.png",
            'china': f"{flag_base_url}china_flag.png",
            'france': f"{flag_base_url}france_flag.png",
            'uk': f"{flag_base_url}uk_flag.png",
            'japan': f"{flag_base_url}japan_flag.png",
            'czech': f"{flag_base_url}czech_flag.png",
            'sweden': f"{flag_base_url}sweden_flag.png",
            'poland': f"{flag_base_url}poland_flag.png",
            'italy': f"{flag_base_url}italy_flag.png",
        }

        tanks = []
        upload_path = "tank_images"  # Folder in your S3 bucket

        if 'data' in tank_data:
            for tank_id, tank in tank_data['data'].items():
                if 'tag' in tank and 'name' in tank:
                    # Construct the original image URL
                    image_url = f"https://na-wotp.wgcdn.co/dcont/tankopedia_images/{tank['tag'].lower()}/{tank['tag'].lower()}_image.png"
                    
                    # Check if image processing is enabled
                    if ENABLE_IMAGE_PROCESSING:
                        cropped_image_url = crop_image_auto(image_url, upload_path)
                    else:
                        # Use the pre-existing URL from S3
                        cropped_image_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{upload_path}/{os.path.basename(image_url)}"
                        print(f"Using existing image URL for {tank['name']}: {cropped_image_url}")
                    
                    # Fallback price handling
                    price = tank.get('price_credit', 0) if tank.get('price_credit') is not None else 0

                    if cropped_image_url:
                        # Create tank instance
                        tanks.append(
                            Tank(
                                name=tank['name'],
                                tag=tank['tag'],
                                description=tank.get('description', 'No description available'),
                                price=price,
                                vehicle_type=tank.get('type', 'Unknown'),
                                tier = tank.get( 'tier', 'Unknown' ),
                                type = tank.get( 'type', 'Unknown' ),
                                nation= capitalize_nation(tank.get('nation', 'Unknown')),
                                nation_flag= nation_flag_urls.get( tank.get( 'nation', 'unknown' )),
                                image=cropped_image_url,
                                crew=tank.get('crew', {}),
                                default_profile=tank.get('default_profile', {}),
                                guns=tank.get('guns', {}),
                                modules_tree=tank.get('modules_tree', {}),
                                next_tanks=tank.get('next_tanks', {}),
                                radios=tank.get('radios', {}),
                                suspensions=tank.get('suspensions', {}),
                                turrets=tank.get('turrets', {})
                            )
                        )
                    else:
                        print(f"Skipping tank {tank['name']} due to image processing failure.")

            # Commit tanks to database
            if tanks:
                db.session.add_all(tanks)
                db.session.commit()
                print(f'{len(tanks)} tanks successfully added to the database.')

    except requests.RequestException as e:
        print(f"Error fetching tank data: {e}")


# Seed Transactions
def seed_transactions(users, tanks):
    """Seeds the Transactions table."""
    if not users or not tanks:
        print('Skipping transaction seeding due to missing users or tanks.')
        return

    transactions = [
        Transaction(user_id=users[0].id, tank_id=tanks[0].id, amount=tanks[0].price, timestamp=datetime.now(tz=timezone.utc)),
        Transaction(user_id=users[1].id, tank_id=tanks[1].id, amount=tanks[1].price, timestamp=datetime.now(tz=timezone.utc))
    ]
    db.session.add_all(transactions)
    db.session.commit()


# Seed Database Function
def seed_database():
    """Calls all individual seeding functions."""
    print('Seeding database with initial data...')
    with app.app_context():
        try:
            users = seed_users()
            seed_tanks()
            tanks = Tank.query.all()  # Fetch tanks after seeding them
            seed_transactions(users, tanks)
            print('Seed data successfully added!')
        except Exception as e:
            print(f"Error occurred while seeding data: {e}")
            db.session.rollback()


# Run the script if executed directly
if __name__ == "__main__":
    clear_database()
    seed_database()
