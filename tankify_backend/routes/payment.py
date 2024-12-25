# Payment Routes Implementation 


# Dependencies 
from flask import Flask, request, jsonify, session, Blueprint 
import requests, re 
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


@payment_routes.route('/api/payments/<user_id>/card/<card_id>', methods=['GET'])
def get_payment_method(user_id, card_id):
    """ Get Payment Method Details for a Specific Card """
    
    try:
        payment_method = PaymentMethods.query.filter_by(id=card_id, user_id=user_id).first()
        if not payment_method:
            return jsonify({'message': 'Payment method not found'}), 404
        return jsonify(payment_method.to_dict_full_card() ), 200
    except Exception as e:
        print('Error fetching payment method:', e)
        return jsonify({'message': 'Internal server error'}), 500


@payment_routes.route('/api/payments/<user_id>', methods=['POST'])
def add_payment_method(user_id): 
    """ Add a Payment Method to a User Instance """
    
    data = request.json
    cardholder_name = data.get('cardholderName')
    card_number = data.get('cardNumber')
    expiry = data.get('expiry')
    cvv = data.get('cvv')
    type = data.get('type')
    details = data.get('details')
    default_method = data.get( 'defaultMethod' )
    print( default_method )

    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        if default_method:
            PaymentMethods.unset_default_for_user(user_id)

        payment_method = PaymentMethods.add_payment_method( 
            user_id=user_id,
            cardholder_name=cardholder_name,
            card_number=card_number,
            expiry=expiry,
            cvv=cvv, 
            type=type,
            details=details,
            default_method=default_method
        )
        return jsonify({'message': 'You have successfully added a payment method!', 'data': payment_method.to_dict()}), 200 

    except Exception as e: 
        print(f'Error occurred while adding new payment method: {e}')
        return jsonify({'message': 'Failed to add new payment method'}), 500



@payment_routes.route('/api/payments/edit/<user_id>/<card_id>', methods=['PATCH'])
def edit_payment_method(user_id, card_id):
    """ Edit a Specific Payment Method Instance """
    
    data = request.json
    print(data)

    try:
        payment_method = PaymentMethods.query.filter_by(id=card_id, user_id=user_id).first()
        if not payment_method:
            return jsonify({'message': 'Payment method not found'}), 404

        if 'cardholderName' in data:
            payment_method.cardholder_name = data['cardholderName']
        if 'cardNumber' in data:
            payment_method.card_number = data['cardNumber']
        if 'expiry' in data:
            payment_method.expiry = data['expiry']
        if 'cvv' in data:
            payment_method.cvv = data['cvv']
        if 'type' in data:
            if data['type'] not in ['Credit', 'Debit']:
                return jsonify({'message': 'Invalid card type. Must be Credit or Debit.'}), 400
            payment_method.type = data['type']
        
        if 'defaultMethod' in data:
            if data['defaultMethod']:
                PaymentMethods.unset_default_for_user(user_id)
                print(f"Unset other default methods for user {user_id}")
            payment_method.default_method = data['defaultMethod']
            print(f"Set default_method for card {card_id} to {data['defaultMethod']}")

        db.session.commit()
        return jsonify({'message': 'Payment method updated successfully', 'data': payment_method.to_dict_full_card()}), 200
    except Exception as e:
        db.session.rollback()
        print('Error updating payment method:', e)
        return jsonify({'message': 'Internal server error'}), 500




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
