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

    data = request.json
    cardholder_name = data.get( 'cardholderName' )
    card_number = data.get( 'cardNumber' )
    expiry = data.get( 'expiry' )
    cvv = data.get( 'cvv' )
    type = data.get( 'type' )
    details = data.get( 'details' )

    try:
        user = User.query.get( user_id )
        payment_method = PaymentMethods.add_payment_method( 
            user_id = user_id,
            cardholder_name = cardholder_name,
            card_number = card_number,
            expiry = expiry,
            cvv = cvv, 
            type = type,
            details = details
        )
        return jsonify({ 'message': 'You have successfully added a payment method!', 'data': payment_method.to_dict() }), 200 

    except Exception as e: 
        print( f'Error occurred while adding new payment method: { e }' )
        return jsonify({ 'message': 'Failed to add new payment method' }), 500 


@payment_routes.route( '/api/payments/<card_id>', methods = [ 'DELETE' ] )
def remove_payment_method( card_id ):
    """ Remove Payment Method from User Instance based on UUID """

    try:
        result= PaymentMethods.remove_payment_method( card_id )
        if 'successfully' in result.get( 'message', '' ):
            return jsonify( result ), 200 
        else: 
            return jsonify( result ), 404 
    except Exception as e:
        print( f'Error occurred while processing delete request: { e }' )
        return jsonify({ 'message': 'Internal server error' }), 500 
