# Models Implementation 


# Dependencies 
from flask_sqlalchemy import SQLAlchemy 
from sqlalchemy import Column, String, DateTime, ForeignKey, Integer, Table, Text
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from sqlalchemy import func
from datetime import datetime, timedelta
import uuid
import bcrypt


# Necessary Files 
from s3_utils import get_s3_client, BUCKET_NAME 


# Other Settings 
db = SQLAlchemy()
Base = db.Model



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
    transactions = relationship( 'Transaction', back_populates='user', lazy= 'select' )
    reviews = relationship( 'Review', back_populates='user', lazy= 'select' )
    inventory = relationship( 'Inventory', back_populates='user', lazy= 'select' )

    def __init__( self, username, password, email, balance = 1000, image = None ):
        self.username = username 
        self.set_password( password )
        self.email = email 
        self.balance = balance
        self.image = image

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
    description = Column( Text, nullable = False )
    price = Column( Integer, nullable = False )
    image_url = Column( String, nullable = True ) 
    rating = Column( Integer, nullable = True, default = 0 )
    created_at = Column( DateTime, server_default = func.now() )

    # Relationships with back_populates and overlaps
    reviews = relationship( 'Review', back_populates='tank', lazy=True )
    inventory = relationship( 'Inventory', back_populates='tank', lazy=True )


    def __init__( self, name, description, price, image_url, rating ):
        self.name = name 
        self.description = description 
        self.price = price 
        self.image_url = image_url 
        self.rating = rating 
    
    def show_profile( self ):
        """ Retrieve Tank Profile """

        tank = {
            'id': str( self.id ),
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'image_url': self.image_url,
            'rating': self.rating
        }
        return tank
    
    @classmethod 
    def get_all( cls ):
        """ Retrieve all Tank Class Instances """

        tanks = cls.query.all()
        tank_list = [ tank.show_profile() for tank in tanks ]
        return tank_list


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


class Review( Base ):
    """ Review Model """

    __tablename__ = 'reviews', 
    id = Column( UUID( as_uuid = True ), primary_key = True, default = uuid.uuid4 )
    user_id = Column( UUID( as_uuid = True ), ForeignKey( 'users.id' ), nullable = False )
    tank_id = Column( UUID( as_uuid = True ), ForeignKey( 'tanks.id' ), nullable = False )
    comment = Column( Text, nullable = True )
    rating = Column( Integer, nullable = False ) 
    created_at = Column( DateTime, server_default = func.now() )

    # Relationships with back_populates
    user = relationship( 'User', back_populates='reviews' )
    tank = relationship( 'Tank', back_populates='reviews' )


class Inventory( Base ):
    """ Inventory Model """

    __tablename__ = 'inventory'
    id = Column( UUID( as_uuid = True ), primary_key = True, default = uuid.uuid4 )
    user_id = Column( UUID( as_uuid = True ), ForeignKey( 'users.id' ), nullable = False )
    tank_id = Column( UUID( as_uuid = True ), ForeignKey( 'tanks.id' ), nullable = False )
    acquired_at = Column( DateTime, server_default = func.now() )

    # Relationships with back_populates
    user = relationship( 'User', back_populates='inventory' )
    tank = relationship( 'Tank', back_populates='inventory' )
