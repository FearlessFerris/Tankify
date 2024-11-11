# Seed File Implementation

# Dependencies
from datetime import datetime, timezone

# Necessary Files
from app import app, db
from models import User, Tank, Transaction, Review, Inventory

def clear_database():
    """ Drops Existing Tables & Creates Fresh based on Models """

    print('Dropping existing database tables...')
    with app.app_context():
        db.drop_all()
        db.create_all()
    print('Database clearing has completed!')

def seed_database():
    """ Seeds Database with mock initial data """

    print('Seeding database with initial data...')
    with app.app_context():
        
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
        tank1 = Tank(
            name='Tiger I',
            description='A fearsome German heavy tank with formidable firepower.',
            price=5000,
            image_url='https://example.com/tiger_tank.jpg',
            rating=4
        )
        tank2 = Tank(
            name='M4 Sherman',
            description='A reliable American medium tank, known for its versatility.',
            price=3000,
            image_url='https://example.com/sherman_tank.jpg',
            rating=3
        )
        db.session.add_all([tank1, tank2])
        db.session.commit()

        # Seed Transactions
        transaction1 = Transaction(
            user_id=user1.id,
            tank_id=tank1.id,
            amount=tank1.price,
            timestamp=datetime.now(tz=timezone.utc)
        )
        transaction2 = Transaction(
            user_id=user2.id,
            tank_id=tank2.id,
            amount=tank2.price,
            timestamp=datetime.now(tz=timezone.utc)
        )
        db.session.add_all([transaction1, transaction2])

        # Seed Reviews
        review1 = Review(
            user_id=user1.id,
            tank_id=tank1.id,
            comment='Incredible power and durability!',
            rating=5,
            created_at=datetime.now(tz=timezone.utc)
        )
        review2 = Review(
            user_id=user2.id,
            tank_id=tank2.id,
            comment='Reliable but could use more armor.',
            rating=4,
            created_at=datetime.now(tz=timezone.utc)
        )
        db.session.add_all([review1, review2])

        # Seed Inventory (Garage)
        inventory1 = Inventory(
            user_id=user1.id,
            tank_id=tank1.id,
            acquired_at=datetime.now(tz=timezone.utc)
        )
        inventory2 = Inventory(
            user_id=user2.id,
            tank_id=tank2.id,
            acquired_at=datetime.now(tz=timezone.utc)
        )
        db.session.add_all([inventory1, inventory2])

        # Commit all changes
        db.session.commit()
    print('Seed data successfully added!')

if __name__ == "__main__":
    clear_database()
    seed_database()
