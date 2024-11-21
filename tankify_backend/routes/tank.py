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
# @tank_routes.route( '/api/tanks/all', methods = [ 'GET' ] )
# def all_tanks(): 
#     """ Retrieve All Available Tanks """

#     tanks = Tank.get__all()
#     return jsonify({ 'message': 'Successfully retrieved all tanks', 'tanks': tanks }), 200 


@tank_routes.route( '/api/tanks/all', methods = [ 'GET' ] )
def all_tanks(): 
    """ Retrieve all Tanks from WOT Developer API """

    api_key = WG_API_KEY
    url = 'https://api.worldoftanks.eu/wot/encyclopedia/vehicles/'
    params = {
        'application_id': api_key,
        'page_no': 1,
    }

    tanks = Tank.get_all()
    response = requests.get( url, params = params )
    if response.status_code == 200:
        data = response.json()
        return jsonify({ 'message': 'Successfully retrieved tanks', 'data': data['data']} )
    else: 
        return jsonify({ 'error': 'Failed to fetch data' }), response.status_code



