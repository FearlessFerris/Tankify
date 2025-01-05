# Transaction Routes Implementation 


# Dependencies 
from flask import Flask, request, jsonify, session, Blueprint 


# Necessary Files 
from models import db, Transaction, User, Currency
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

    user = User.query.filter_by( id = user_id ).first() 
    if not user: 
        return jsonify({ 'success': False, 'message': f'User not found' }), 404 
    