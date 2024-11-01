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
    updated_at = Column( DateTime, server_default = func.now() )

    # Relationships with back_populates and overlaps
    transactions = relationship( 'Transaction', back_populates='user', lazy=True )
    reviews = relationship( 'Review', back_populates='user', lazy=True )
    inventory = relationship( 'Inventory', back_populates='user', lazy=True )

    def __init__( self, username, password_hash, email, balance = 1000, image = None ):
        self.username = username 
        self.password_hash = password_hash 
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
        }
        return user

    @classmethod 
    def create_user( cls, username, password, email, image = None ):
        """ Create New User Instance """

        hashed_pw = bcrypt.hashpw( password.encode( 'utf-8' ), bcrypt.gensalt( 12 )).decode( 'utf-8' )
        new_user = cls( username = username, password_hash = hashed_pw, email = email, image = image )
        db.session.add( new_user )
        db.session.commit()
        return new_user

    
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

    __tablename__ = 'reviews'
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
