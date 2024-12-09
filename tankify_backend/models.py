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
    transactions = relationship( 'Transaction', back_populates='user', lazy= 'select' )

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
    tag = Column( String, nullable = False )
    description = Column( String, nullable = False )
    price = Column( String, nullable = False )
    type = Column( String, nullable = False )
    nation = Column( String, nullable = False )
    nation_flag = Column( String, nullable = False )
    tier = Column( String, nullable = False )
    carousel_image = Column( String, nullable = False )
    hd_image = Column( String, nullable = False )
    created_at = Column( DateTime, server_default = func.now() )

    # Relationships 


    # Instance Methods 
    def __init__( self, name, tag, description, price, type, nation, nation_flag, tier, hd_image, carousel_image ): 
        self.name = name 
        self.tag = tag 
        self.description = description
        self.price = price 
        self.type = type
        self.nation = nation
        self.nation_flag = nation_flag
        self.tier = tier
        self.hd_image = hd_image 
        self.carousel_image = carousel_image

    def show_info( self ): 
        """ Retrieves Tank Information """

        tank = {
            'id': str( self.id ),
            'name': self.name,
            'tag': self.tag,
            'description': self.description,
            'price': self.price,
            'type': self.type, 
            'nation': self.nation, 
            'nation_flag': self.nation_flag, 
            'tier': self.tier,
            'hd_image': f'{ WOT_CDN_BASE }{ self.tag.lower() }/{ self.tag.lower() }_image.png',
            'carousel_image': self.carousel_image,

        }
        return tank 
    
    # Class Methods 
    @classmethod
    def get_all_tanks( cls ): 
        """ Retrieves all Tanks from Database """

        tanks = cls.query.all()
        tank_list = [ tank.show_info() for tank in tanks ]
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
