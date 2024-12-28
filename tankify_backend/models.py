# Models Implementation 


# Dependencies 
from flask_sqlalchemy import SQLAlchemy 
from sqlalchemy import Boolean, Column, String, DateTime, ForeignKey, Integer, Table, Text, Float
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from sqlalchemy import func
from datetime import datetime, timedelta
import uuid
import bcrypt
import requests 


# Necessary Files 
from s3_utils import get_s3_client, BUCKET_NAME 


# Other Settings 
db = SQLAlchemy()
Base = db.Model


# Base URL's 
WOT_CDN_BASE = 'https://na-wotp.wgcdn.co/dcont/tankopedia_images/'


class User( Base ):
    """ User Model """

    __tablename__ = 'users'
    id = Column( UUID( as_uuid = True ), primary_key = True, default = uuid.uuid4 )
    username = Column( String, unique = True, nullable = False )
    password_hash = Column( String, nullable = False )
    email = Column( String, unique = True, nullable = False )
    image = Column( String, nullable = True )
    balance = Column( Integer, default = 1000 )
    created_at = Column( DateTime, server_default = func.now() )
    updated_at = Column( DateTime, server_default = func.now(), onupdate = func.now() )

    # Relationships with back_populates and overlaps
    payment_methods = relationship( 'PaymentMethods', back_populates = 'user', lazy = 'select' )
    transactions = relationship( 'Transaction', back_populates='user', lazy= 'select' )

    def __init__( self, username, password, email, balance = 1000, image = None ):
        self.username = username 
        self.set_password( password )
        self.email = email 
        self.balance = balance
        self.image = image

    def __repr__(self):
        """ User Representation Method for Instance """
        
        return (
            f"<User(id='{self.id}', "
            f"username='{self.username}', "
            f"email='{self.email}', "
            f"balance='{self.balance}', "
            f"image='{self.image}', "
            f"created_at='{self.created_at}')>"
        )


    def get_user_profile( self ):
        """ Retrieve entire User Profile """

        user = {
            'id': str( self.id ),
            'username': self.username,
            'email': self.email,
            'balance': self.balance,
            'image': self.image,
            'created_at': self.created_at
        }
        return user
    
    def set_password( self, password ):
        """ Sets a User Instance Password """

        self.password_hash = bcrypt.hashpw( password.encode( 'utf-8' ), bcrypt.gensalt( 12 )).decode( 'utf-8' )

    def verify_password( self, password ):
        """ Verifies the instance of a User Password """

        return bcrypt.checkpw( password.encode( 'utf-8' ), self.password_hash.encode( 'utf-8' ))

    def upload_image( self, file = None, link = None ):
        """ Upload Profile Image or Link to Image """

        if file:
            s3 = get_s3_client()
            key = f'user_{ self.id }/{ file.filename }'
            try:
                s3.upload_fileobj( file, BUCKET_NAME, key )
                self.image = f'https://{ BUCKET_NAME }.s3.amazonaws.com/{ key }'
                print( self.image )
                db.session.commit()
                return { 'success': True, 'image_url': self.image }
            except Exception as e: 
                print( f'Error uploading image file to S3: { e }' )
                return { 'success': False, 'error': str( e ) }
        elif link:
            if link.startswith( 'http://' ) or link.startswith( 'https://' ):
                self.image = link
                db.session.commit()
                return { 'success': True, 'image_url': self.image, 'user': self.get_user_profile() }
            else: 
                return { 'success': False, 'error': 'Invalid URL Format' }
        return { 'success': False, 'error': 'No File Provided' }
    
    def update_profile(self, **kwargs):
        """ Updates any / all fields of a User Instance """
    
        if 'password' in kwargs and 'newPassword' in kwargs and 'confirmNewPassword' in kwargs:
            current_password = kwargs['password']
            new_password = kwargs['newPassword']
            confirm_password = kwargs['confirmNewPassword']
        
            if not self.verify_password( current_password ):
                return {'success': False, 'message': 'Current password is incorrect'}

            if new_password != confirm_password:
                return {'success': False, 'message': 'New password and confirm password do not match'}
        
            if current_password == new_password:
                return {'success': False, 'message': 'New password must be different from the current password'}

            self.set_password(new_password)

        for key, value in kwargs.items():
            if key not in ['password', 'newPassword', 'confirmNewPassword'] and hasattr(self, key):
                setattr(self, key, value)
        try:
            db.session.commit()
            return {'success': True, 'message': f'{ self.username }, your profile was updated successfully', 'user': self.get_user_profile()} 
        except Exception as e:
            db.session.rollback()
            return {'success': False, 'error': str(e)}

    @classmethod 
    def create_user( cls, username, password, email, image = None ):
        """ Create New User Instance """

        new_user = cls( username = username, password = password, email = email, image = image )
        db.session.add( new_user )
        db.session.commit()
        return new_user
    
    @classmethod 
    def login_user( cls, username, password ):
        """ Login / Authenticate User Instance """

        user = cls.query.filter_by( username = username ).first()
        if user and user.verify_password( password ):
            return user
        return None 


class Tank( Base ):
    """ Tank Model """

    __tablename__ = 'tanks'
    id = Column( UUID( as_uuid = True ), primary_key = True, default = uuid.uuid4 )
    name = Column( String, nullable = False )
    tag = Column( String, nullable = False )
    description = Column( String, nullable = False )
    price = Column( String, nullable = False )
    vehicle_type = Column( String, nullable = False )
    tier = Column( String, nullable = False )
    type = Column( String, nullable = False )
    nation = Column( String, nullable = False )
    nation_flag = Column( String, nullable = False )
    image = Column( String, nullable = False )
    crew = Column( JSONB, nullable = False )
    default_profile = Column( JSONB, nullable = False )
    guns = Column( JSONB, nullable = False )
    modules_tree = Column( JSONB, nullable = False )
    next_tanks = Column( JSONB, nullable = False )
    radios = Column( JSONB, nullable = False )
    suspensions = Column( JSONB, nullable = False )
    turrets = Column( JSONB, nullable = False )

    def __init__( self, name, tag, description, price, vehicle_type, tier, type, nation, nation_flag, image, crew, default_profile, guns, modules_tree, next_tanks, radios, suspensions, turrets ):
        """ Initialize Tank Class """

        self.name = name 
        self.tag = tag 
        self.description = description
        self.price = price
        self.vehicle_type = vehicle_type
        self.tier = tier
        self.type = type
        self.nation = nation 
        self.nation_flag = nation_flag 
        self.image = image 
        self.crew = crew 
        self.default_profile = default_profile 
        self.guns = guns
        self.modules_tree = modules_tree 
        self.next_tanks = next_tanks 
        self.radios = radios 
        self.suspensions = suspensions 
        self.turrets = turrets 

    def __repr__(self):
        return( 
            f"<Tank( id = '{ self.id }',"
            f"name = '{ self.name }',"
            f"tag = '{ self.tag }',"
            f"description = '{ self.description }',"
            f"price = '{ self.price }',"
            f"vehicle_type = '{ self.vehicle_type }',"
            f"tier = '{ self.tier }',"
            f"type = '{ self.type }',"
            f"nation = '{ self.nation }',"
            f"nation_flag = '{ self.nation_flag }',"
            f"image = '{ self.image }',"
            f"crew = '{ self.crew }',"
            f"default_profile = '{ self.default_profile }',"
            f"guns = '{ self.guns }',"
            f"modules_tree = '{ self.modules_tree }',"
            f"next_tanks = '{ self.next_tanks }',"
            f"radios = '{ self.radios }',"
            f"suspensions = '{ self.suspensions }',"
            f"turrets = '{ self.turrets }')>"
        )

    @classmethod
    def all_tanks( cls ):
        """ Retrieve all Tanks """

        tanks = cls.query.all()
        tank_list = [ tank.__repr__() for tank in tanks ]
        return tank_list


class PaymentMethod( Base ): 
    """ Payment Mehtod Model """

    __tablename__ = 'payment_methods'
    id = Column( UUID( as_uuid = True ), primary_key = True, default = uuid.uuid4 )
    user_id = Column( UUID( as_uuid = True ), ForeignKey( 'users.id' ), nullable = False )
    cardholder_name = Column( String, nullable = False )
    card_number = Column( String, nullable = False )
    expiry = Column( String, nullable = False )
    cvv = Column( String, nullable = False )
    type = Column( String, nullable = False )
    details = Column( JSONB, nullable = False )
    default_method = Column( Boolean, nullable = False, default = False )
    created_at = Column( DateTime, server_default = func.now() )

    # Relationships 
    user = relationship( 'User', back_populates = 'payment_methods', lazy = 'select' )

    def __init__( self, user_id, type, cardholder_name, card_number, expiry, cvv, details, default_method = False ):
        """ Initiates PaymentMethod Instance """

        self.user_id = user_id 
        self.cardholder_name = cardholder_name 
        self.card_number = card_number
        self.expiry = expiry 
        self.cvv = cvv  
        self.type = type 
        self.details = details 
        self.default_method = default_method

    def __repr__( self ): 
        """ PaymentMethod Representation Method for Instance """
    
        return ( 
            f"<PaymentMethod(id = '{ self.id }',"
            f"user_id = '{ self.user_id }',"
            f"cardholder_name = '{ self.cardholder_name }',"
            f"card_number = '{ self.card_number }',"
            f"expiry = '{ self.expiry }',"
            f"cvv = '{ self.cvv }',"
            f"type = '{ self.details }',"
            f"default_method = '{ self.default_method }')>"
        )

    def to_dict( self ): 
        """ Converts PaymentMethod Instance to Dictionary """

        return {
            'id': str( self.id ),
            'user_id': str( self.user_id ),
            'cardholder_name': self.cardholder_name,
            'card_number': self.card_number[ -4: ],
            'expiry': self.expiry,
            'cvv': self.cvv,
            'type': self.type,
            'details': self.details,
            'default_method': self.default_method,
            'creaded_at': self.created_at.isoformat(),
        }
    
    def to_dict_full_card( self ): 
        """ Converts PaymentMethod Instance to Dictionary with Full Card Number """

        return {
            'id': str( self.id ),
            'user_id': str( self.user_id ),
            'cardholder_name': self.cardholder_name,
            'card_number': self.card_number,
            'expiry': self.expiry,
            'cvv': self.cvv,
            'type': self.type,
            'details': self.details,
            'default_method': self.default_method,
            'created_at': self.created_at.isoformat(),
        }

    @classmethod 
    def get_payment_method( cls, user_id ): 
        """ Retrieves all Instances of a Users PaymentMethods """

        payment_methods = cls.query.filter( cls.user_id == user_id ).all() 
        return [ pm.to_dict() for pm in payment_methods ]

    @classmethod
    def add_payment_method( cls, user_id, cardholder_name, card_number, expiry, cvv, type, details, default_method = False ):
        """ Create New PaymentMethod Instance """

        user = User.query.filter_by( id = user_id ).first() 
        if not user: 
            print( f'User { user_id } not found' )
            return None

        if not ( cardholder_name and card_number and expiry and cvv and type ):
            print( f'Missing required payment method fields' )
            return None
        
        if default_method: 
            cls.query.filter_by( user_id = user_id, default_method = True ).update({ 'default_method': False })
            db.session.commit() 

        payment_method = cls( 
            user_id = user_id, 
            cardholder_name = cardholder_name, 
            card_number = card_number, 
            expiry = expiry, 
            cvv = cvv, 
            type = type, 
            details = details,
            default_method = default_method,
            )
        db.session.add( payment_method )
        db.session.commit() 
        print( f'Payment method for user { user_id } added successfully' )
        return payment_method
    
    @classmethod
    def remove_payment_method( cls, card_id ):
        """ Removes PaymentMethod Instance """

        try:
            payment_method = cls.query.filter_by( id = card_id ).first() 
            card_number = payment_method.to_dict().get( 'card_number' )
            print( card_number )
            if not payment_method: 
                return { 'message': 'Payment method not found' }
            db.session.delete( payment_method )
            db.session.commit() 
            return { 'message': f'Payment method ending in: { card_number } successfully removed' }
        except Exception as e: 
            db.session.rollback()
            print( f'Error occurred while removing payment method: { e }' )
            return { 'message': 'Failed to remove payment method' }

    @classmethod 
    def set_default_method( cls, user_id, payment_method_id ):
        """ Set a Payment Method as Default """

        payment_method = cls.query.filter_by( id = payment_method_id, user_id = user_id ).first() 
        if not payment_method: 
            return { 'message': 'Payment method not found' }
        cls.query.filter_by( user_id = user_id, default_method = True ).update({ 'default_method': False })
        db.session.commit()
        payment_method.default_method = True
        card_number = payment_method.to_dict().get( 'card_number' )
        db.session.commit() 
        return { 'message': f'Payment method { card_number } set as default' }

    @classmethod
    def unset_default_for_user(cls, user_id):
        """ Unset all default methods for a user """
        rows_updated = cls.query.filter_by(user_id=user_id, default_method=True).update({'default_method': False})
        db.session.commit()
        print(f"Unset default for user {user_id}. Rows updated: {rows_updated}")


class Transaction( Base ):
    """ Transaction Model """

    __tablename__ = 'transactions'
    id = Column( UUID( as_uuid = True ), primary_key = True, default = uuid.uuid4 )
    user_id = Column( UUID( as_uuid = True ), ForeignKey( 'users.id' ), nullable = False )
    tank_id = Column( UUID( as_uuid = True ), ForeignKey( 'tanks.id' ), nullable = False )
    amount = Column( Integer, nullable = False )  
    timestamp = Column( DateTime, server_default = func.now() )

    # Relationships with back_populates
    user = relationship( 'User', back_populates='transactions' )
    tank = relationship( 'Tank', backref='transactions' )


class Currency( Base ): 
    """ Currency Model """

    __tablename__ = 'currencies'
    id = Column( UUID( as_uuid = True ), primary_key = True, default = uuid.uuid4 )
    iso = Column( String, nullable = False )
    name = Column( String, nullable = False )
    symbol = Column( String, nullable = False )
    exchange_rate = Column( Float, nullable = False )
    country = Column( String, nullable = False )
    is_active = Column( Boolean, nullable = False, default = True )
    description = Column( String, nullable = False )
    updated_at = Column( DateTime, server_default = func.now(), onupdate = func.now() )

    def __init__( self, iso, name, symbol, exchange_rate, country, is_active, description ):
        """ Initiates Currency Instance """
        
        self.iso = iso 
        self.name = name 
        self.symbol = symbol 
        self.exchange_rate = exchange_rate 
        self.country = country 
        self.is_active = is_active 
        self.description = description 
    
    def __repr__( self ):
        """ Currency Representation Method for Instance """

        return( 
            f"<Currency( id = '{ self.id }',"
            f"iso = '{ self.iso }',"
            f"symbol = '{ self.symbol }',"
            f"exchange_rate = '{ self.exchange_rate }',"
            f"country = '{ self.country }',"
            f"is_active = '{ self.is_active }',"
            f"description = '{ self.description }')>"
        )
    
    @classmethod 
    def add_currency( cls, iso, name, symbol, exchange_rate, country, is_active, description ): 
        """ Create New Currency Instance """

        new_currency = cls( 
            iso = iso, 
            name = name, 
            symbol = symbol, 
            exchange_rate = exchange_rate, 
            country = country, 
            is_active = is_active, 
            description = description 
        )

        db.session.add( new_currency )
        db.session.commit() 
        return new_currency



# class Review( Base ):
#     """ Review Model """

#     __tablename__ = 'reviews', 
#     id = Column( UUID( as_uuid = True ), primary_key = True, default = uuid.uuid4 )
#     user_id = Column( UUID( as_uuid = True ), ForeignKey( 'users.id' ), nullable = False )
#     tank_id = Column( UUID( as_uuid = True ), ForeignKey( 'tanks.id' ), nullable = False )
#     comment = Column( Text, nullable = True )
#     rating = Column( Integer, nullable = False ) 
#     created_at = Column( DateTime, server_default = func.now() )

#     # Relationships with back_populates
#     user = relationship( 'User', back_populates='reviews' )
#     tank = relationship( 'Tank', back_populates='reviews' )


# class Inventory( Base ):
#     """ Inventory Model """

#     __tablename__ = 'inventory'
#     id = Column( UUID( as_uuid = True ), primary_key = True, default = uuid.uuid4 )
#     user_id = Column( UUID( as_uuid = True ), ForeignKey( 'users.id' ), nullable = False )
#     tank_id = Column( UUID( as_uuid = True ), ForeignKey( 'tanks.id' ), nullable = False )
#     acquired_at = Column( DateTime, server_default = func.now() )

#     # Relationships with back_populates
#     user = relationship( 'User', back_populates='inventory' )
#     tank = relationship( 'Tank', back_populates='inventory' )
