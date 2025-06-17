# Transaction Routes Implementation 


# Dependencies 
from flask import Flask, request, jsonify, session, Blueprint 


# Necessary Files 
from models import db, Transaction, User, Currency, PaymentMethod, Tank
from .error_handlers import error_handler 


# Define a blueprint for routes 
transaction_routes = Blueprint( 'transaction_routes', __name__ )


# Transaction Routes


# Get All Transactions Route 
@transaction_routes.route( '/api/transaction/<user_id>/all', methods = [ 'GET' ] )
def get_all_transactions( user_id ):
    """ Retrieves all User Transaction Instances """

    user = User.query.filter_by( id = user_id ).first()
    if not user: 
        return jsonify({ 'success': False, 'message': f'User not found' }), 404  
    
    selected_filter = request.args.get( 'filter', None )
    try: 
        transactions = Transaction.get_all_transactions( user_id = user_id, selected_filter = selected_filter )
        return jsonify({ 'success': True, 'data': transactions }), 200 
    except Exception as e:
        print( f'Error retrieving transactions: ', e )
        return jsonify({ 'success': False, 'message': f'Internal server error' }), 500


# Create New Transaction Route 
@transaction_routes.route( '/api/transaction/<user_id>/create', methods = [ 'POST' ] )
def create_new_transaction( user_id ):
    """ Creates new User Transaction Instance """

    data = request.get_json() 
    payment_source = data.get( 'paymentSource' )
    transaction_purpose = data.get( 'transactionPurpose' )
    amount = data.get( 'amount' )
    payment_method_id = data.get( 'paymentMethodId', None )

    if type is None or amount is None: 
        return jsonify({ 'success': False, 'message': 'Missing required fields' }), 400
    
    user = User.query.filter_by( id = user_id ).first() 
    if not user: 
        return jsonify({ 'success': False, 'message': 'User not found' }), 404 
    
    if payment_method_id: 
        payment_method_id = PaymentMethod.query.filter_by( id = payment_method_id, user_id = user_id ).first()
        if not payment_method_id: 
            return jsonify({ 'success': False, 'message': 'Invalid payment method' }), 400
    
    try: 
        result = Transaction.create_transaction( 
            user_id = user_id, 
            payment_source = payment_source,
            transaction_purpose = transaction_purpose, 
            amount = amount,
            payment_method_id = payment_method_id
        )

        if result.get( 'success' ): 
            return jsonify({ 'success': True, 'message': result[ 'message' ] }), 201 
        else: 
            return jsonify({ 'success': False, 'message': result[ 'message' ] }), 400

    except Exception as e: 
        print( f'Error processing transaction: { e }' )
        return jsonify({ 'success': False, 'message': 'Internal server error' }), 500 
    

# Processes Transaction Route 
@transaction_routes.route('/api/transaction/purchase', methods=['POST'])
def process_purchase_route():
    """ Handles processing of purchases using either in-game currency or credit/debit card. """

    data = request.json

    user_id = data.get('userId')
    amount = int( data.get('amount') )
    payment_source = data.get('paymentSource')
    payment_method_id = data.get( 'paymentMethodId', None )

    print( data )

    if not user_id or amount is None:
        return jsonify({'success': False, 'message': 'Missing required fields'}), 400

    result = Transaction.process_purchase(
        user_id=user_id,
        payment_source=payment_source,
        amount=amount,
        payment_method_id=payment_method_id
    )

    if result['success']:
        return jsonify(result), 201
    else:
        return jsonify(result), 400
