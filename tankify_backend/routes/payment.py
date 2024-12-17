# Payment Routes Implementation 


# Dependencies 
from flask import Flask, request, jsonify, session, Blueprint 
import requests 
import os 
from sqlalchemy import func


# Necessary Files 
from models import db, Tank, User, PaymentMethods 


# Define a blueprint for routes 
payment_routes = Blueprint( 'payment_routes', __name__ )


# Payment Routes 


# Add Payment Method 
@payment_routes.route( '/api/payments/<user_id>/all', methods = [ 'GET' ] )
def get_payment_methods( user_id ):
    """ Retrieve all Payment Methods for a User Instance """

    try:    
        user = User.query.get( user_id )
        if not user: 
            return jsonify({ 'message': 'User not found' }), 404 
        
        payment_methods = PaymentMethods.get_payment_method( user_id )
        return jsonify({ 'message': 'Successfully retrieved payment methods', 'data': payment_methods }), 200 

    except Exception as e: 
        print( f'Error occurred while retrieving payment methods: { e }' )
        return jsonify({ 'message': 'Failed to retireve payment methods' }), 500 


@payment_routes.route( '/api/payments/<user_id>', methods = [ 'POST' ] )
def add_payment_method( user_id ): 
    """ Add a Payment Method to a User Instance """

    try:
        user = User.query.get( user_id )
        print( user )
    except Exception as e: 
        print( f'Error occurred while adding new payment method: { e }' )
        return jsonify({ 'message': 'Failed to add new payment method' }), 500 