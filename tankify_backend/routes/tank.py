# Tank Routes Implementation 


# Dependencies 
from flask import Flask, request, jsonify, session, Blueprint 


# Necessary Files 
from models import db, Tank 


# Define a blueprint for routes 
tank_routes = Blueprint( 'tank_routes', __name__ )


# Tank Routes 
@tank_routes.route( '/api/tanks/all', methods = [ 'GET' ] )
def all_tanks(): 
    """ Retrieve All Available Tanks """

    tanks = Tank.get__all()
    return jsonify({ 'message': 'Successfully retrieved all tanks', 'tanks': tanks }), 200 
