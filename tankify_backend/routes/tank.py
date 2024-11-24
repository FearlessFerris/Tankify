# Tank Routes Implementation 


# Dependencies 
from flask import Flask, request, jsonify, session, Blueprint 
import requests 
import os 
from dotenv import load_dotenv


# Necessary Files 
from models import db, Tank 


# Define a blueprint for routes 
tank_routes = Blueprint( 'tank_routes', __name__ )


# Load Environmental Variables 
load_dotenv()
WG_API_KEY = os.getenv( 'WG_API_KEY' )


# Tank Routes 
@tank_routes.route( '/api/tanks/all', methods = [ 'GET' ] )
def all_tanks(): 
    """ Retrieve all Tanks from WOT Developer API """

    try:
        tanks = Tank.get_all_tanks()
        return jsonify({ 'message': 'Successfully retrieved tanks!', 'data': tanks })
    except Exception as e: 
        print( f'Error occurred while fetching tanks: { e }' )
        return jsonify({ 'error': 'Failed to fetch data' }), 500 


@tank_routes.route( '/api/tanks/<tank_id>', methods = [ 'GET' ] )
def get_tank( tank_id ): 
    """ Retrieve Tank by ID """

    try:
        tank = Tank.query.get( tank_id )
        if tank: 
            return jsonify({ 'message': 'Successfully retrieved tank!', 'data': tank.show_info() })
        else:
            return jsonify({ 'message': 'Error, tank not found' }), 404 
    except Exception as e: 
        print( f'Error occurred while fetching tank by ID: { e }' )
        return jsonify({ 'message': 'Failed to fetch data' }), 500 
    

