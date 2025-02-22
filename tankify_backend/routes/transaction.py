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
    try: 
        transactions = Transaction.get_all_transactions()
        return jsonify({ 'success': True, 'data': transactions }), 200 
    except Exception as e:
        print( f'Error retrieving transactions: ', e )
        return jsonify({ 'success': False, 'message': f'Internal server error' }), 500


# Create New Transaction Route 
@transaction_routes.route( '/api/transaction/<user_id>/create', methods = [ 'POST' ] )
def create_new_transaction( user_id ):
    """ Creates new User Transaction Instance """

    data = request.json() 
    payment_method_id = data.get( 'paymentMethodId' )
    currency_id = data.get( 'currencyId' )
    transaction_type = data.get( 'transactionType' )
    amount = data.get( 'amount' )
    tank_id = data.get( 'tankId', None )

    if not payment_method_id or not currency_id or not transaction_type or amount is None: 
        return jsonify({ 'success': False, 'message': f'Missing required fields' }), 400 

    result = Transaction.add_transaction( 
        user_id = user_id,
        payment_method_id = payment_method_id,
        currency_id = currency_id,
        transaction_type = transaction_type,
        amount = amount,
        tank_id = tank_id
    ) 

    print( result )

    if result.get( 'success' ):
        return jsonify({ 'success': True, 'message': result[ 'message' ], 'data': result[ 'data' ] }), 201 
    else: 
        return jsonify({ 'success': False, 'message': result[ 'message' ] }), 400


# Process New Tank Purchase Route 
@transaction_routes.route( '/api/transaction/<user_id>/<tank_id>/purchase', methods = [ 'POST' ] )
def process_tank_purchase( user_id, tank_id ): 
    """ Processes New Tank Purchase """

    process_purchase = Transaction.process_purchase( user_id, tank_id )
    print( process_purchase )
    
    return jsonify({ 'success': True, 'message': process_purchase[ 'message' ] }), 201 
