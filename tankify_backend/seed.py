# Dependencies
from datetime import datetime, timezone
import uuid

# Necessary Files
from app import app, db
from models import User, Tank, Transaction, Inventory, Review

# Define the clear_database function
def clear_database():
    """ Drops Existing Tables if Exist & Creates Fresh based on Models """

    print('Dropping existing database tables if they exist...')
    with app.app_context():
        db.drop_all()
        db.create_all()
    print('Database clearing has completed!')

# Define the seed_database function
def seed_database():
    """ Seeds Database with mock initial data """

    print('Seeding database with initial data...')
    with app.app_context():
        try:
            # Seed Users
            user1 = User( 
                username='Jack Sparrow',
                password='IamAsuperSecretPassword',
                email='jacksparrow@thesevenseas.org',
                image='https://lumiere-a.akamaihd.net/v1/images/bluesteel_d0f846ee.jpeg'
            )
            user2 = User(
                username='Lara Croft',
                password='AnotherSecretPassword',
                email='lara.croft@tombraider.com',
                image='https://example.com/lara_croft_image.jpg'
            )
            db.session.add_all([user1, user2])
            db.session.commit()

            # Seed Tanks
            tanks = [
                Tank(name='Tiger I', description='A fearsome German heavy tank with formidable firepower.', price=5000, image_url='https://na-wotp.wgcdn.co/dcont/tankopedia_images/g04_pzvi_tiger_i/g04_pzvi_tiger_i_image_resized.png', rating=4),
                Tank(name='M4 Sherman', description='A reliable American medium tank, known for its versatility.', price=3000, image_url='https://na-wotp.wgcdn.co/dcont/tankopedia_images/a05_m4_sherman/a05_m4_sherman_image_resized.png', rating=3),
                Tank(name='T-34', description='A legendary Soviet medium tank, well-known for its ruggedness and efficiency.', price=4000, image_url='https://wxpcdn-cbprodretail.gcdn.co/dcont/tankopedia/ussr/R07_T-34-85_preview.png', rating=5),
                Tank(name='Panzer IV', description='A German medium tank, widely used during WWII.', price=3500, image_url='https://na-wotp.wgcdn.co/dcont/tankopedia_images/g81_pz_iv_ausfh/g81_pz_iv_ausfh_image_resized.png', rating=4),
                Tank(name='Churchill Mk IV', description='A British heavy infantry tank with thick armor.', price=4500, image_url='https://upload.wikimedia.org/wikipedia/commons/0/0b/Churchill_Mk_IV.jpg', rating=4),
                Tank(name='Centurion', description='A post-WWII British main battle tank, known for its reliability.', price=6000, image_url='https://sg-wotp.wgcdn.co/dcont/tankopedia_images/gb24_centurion_mk3/gb24_centurion_mk3_image_resized.png', rating=5),
                Tank(name='KV-1', description='A Soviet heavy tank, famous for its strong armor during early WWII.', price=4800, image_url='https://na-wotp.wgcdn.co/dcont/tankopedia_images/r80_kv1/r80_kv1_image_resized.png', rating=4),
                Tank(name='M26 Pershing', description='An American heavy tank, introduced late in WWII.', price=5200, image_url='https://wxpcdn-cbprodretail.gcdn.co/dcont/tankopedia/usa/A35_Pershing_preview.png', rating=4),
                Tank(name='Leopard 1', description='A German main battle tank, known for its speed and firepower.', price=7000, image_url='https://na-wotp.wgcdn.co/dcont/tankopedia_images/g89_leopard1/g89_leopard1_image_resized.png', rating=5),
                Tank(name='Cromwell', description='A British cruiser tank, known for its speed and agility during WWII.', price=3200, image_url='https://eu-wotp.wgcdn.co/dcont/fb/image/cromwell_png.png', rating=3)
            ]
            db.session.add_all(tanks)
            db.session.commit()

            # Seed Transactions
            transaction1 = Transaction(
                user_id=user1.id,
                tank_id=tanks[0].id,  # Using the first tank in the list
                amount=tanks[0].price,
                timestamp=datetime.now(tz=timezone.utc)
            )
            transaction2 = Transaction(
                user_id=user2.id,
                tank_id=tanks[1].id,  # Using the second tank in the list
                amount=tanks[1].price,
                timestamp=datetime.now(tz=timezone.utc)
            )
            db.session.add_all([transaction1, transaction2])

            # Seed Reviews
            review1 = Review(
                user_id=user1.id,
                tank_id=tanks[0].id,
                comment='Incredible power and durability!',
                rating=5,
                created_at=datetime.now(tz=timezone.utc)
            )
            review2 = Review(
                user_id=user2.id,
                tank_id=tanks[1].id,
                comment='Reliable but could use more armor.',
                rating=4,
                created_at=datetime.now(tz=timezone.utc)
            )
            db.session.add_all([review1, review2])

            # Seed Inventory (Garage)
            inventory1 = Inventory(
                user_id=user1.id,
                tank_id=tanks[0].id,
                acquired_at=datetime.now(tz=timezone.utc)
            )
            inventory2 = Inventory(
                user_id=user2.id,
                tank_id=tanks[1].id,
                acquired_at=datetime.now(tz=timezone.utc)
            )
            db.session.add_all([inventory1, inventory2])

            # Commit all changes
            db.session.commit()
        except Exception as e:
            print(f"Error occurred while seeding data: {e}")
            db.session.rollback()
    print('Seed data successfully added!')

# Run the script if executed directly
if __name__ == "__main__":
    clear_database()
    seed_database()
