# Currency Routes Implementation 


# Dependencies 
from flask import Flask, request, jsonify, session, Blueprint 
import requests, re, os
from sqlalchemy import func 


# Necessary Files 
from models import db, Tank, User, PaymentMethod, Currency 


# Define a blueprint for routes 
currency_routes = Blueprint( 'currency_routes', __name__ )


# Currency Routes 
@currency_routes.route( '/api/currencies/all', methods = [ 'GET' ] )
def get_all_currencies(): 
    """ Retrieve all Currencies within Database """

    try: 
        currencies = Currency.get_all_currencies()
        return jsonify({ 'success': True, 'data': currencies }), 200 
    except Exception as e: 
        print( f'Error retrieving currencies: { e }' )
        return jsonify({ 'success': False, 'message': 'Failed to retrieve currencies' }), 500 