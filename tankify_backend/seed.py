# Seed File Implementation 


# Dependencies
import requests
from datetime import datetime, timezone
from dotenv import load_dotenv
import os 


# Necessary Files 
from app import app, db
from models import User, Tank, Transaction


# Load Environmental Variables 
load_dotenv()
WG_API_KEY = os.getenv( 'WG_API_KEY' )



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
def seed_tanks():
    """Seeds the Tanks table with data from World of Tanks API."""
    print('Fetching tank data from World of Tanks API...')
    try:
        response = requests.get('https://api.worldoftanks.com/wot/encyclopedia/vehicles/', params={'application_id': WG_API_KEY })
        response.raise_for_status()
        tank_data = response.json()

        # Logging the response for debugging purposes
        print(f'API Response: {tank_data}')

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
        if 'data' in tank_data and isinstance(tank_data['data'], dict):
            for tank_id, tank_info in tank_data['data'].items():
                if 'name' in tank_info and 'price_credit' in tank_info:
                    nation = tank_info.get('nation', '').lower()
                    tanks.append(
                        Tank(
                            name=tank_info.get('name', 'Unknown Tank'),
                            description=tank_info.get('description', 'No description available.'),
                            price=tank_info.get('price_credit', 1000) if tank_info.get('price_credit') is not None else 1000, 
                            type=tank_info.get('type', 'Unknown Type'),
                            nation=nation,
                            nation_flag=nation_flag_urls.get(nation, ''),
                            tier=tank_info.get('tier', 'Unknown Tier'),
                            image=tank_info.get('images', {}).get('big_icon', '')
                        )
                    )
                else:
                    print(f'Skipping tank with ID {tank_id} due to missing name or price_credit.')

            if tanks:
                db.session.add_all(tanks)
                db.session.commit()
                print(f'{len(tanks)} tanks successfully added to the database.')
            else:
                print('No valid tank data found to add to the database.')
        else:
            print('No tank data found in the API response or unexpected response format.')
    except requests.RequestException as e:
        print(f'Error occurred while fetching tank data: {e}')


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
