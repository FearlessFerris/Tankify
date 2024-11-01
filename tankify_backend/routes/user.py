# User Routes Implementation 


# Dependencies 
from flask import Flask, request, jsonify, session, Blueprint


# Necessary Files 
from models import db, User 


# Define a blueprint for routes
user_routes = Blueprint('user_routes', __name__)


# Homepage route
@user_routes.route('/')
def homepage():
    """ Application Homepage """

    
    return "<h1>Welcome to Tankify!</h1><p>Your one-stop shop for tanks and tank-related products.</p>"


@user_routes.route( '/api/create', methods = [ 'POST' ] )
def create_user(): 
    """ Creates User Account Instance """

    data = request.get_json()
    username = data.get( 'username' )
    password = data.get( 'password' )
    email = data.get( 'email' )
    image = data.get( 'image' )

    if not username and password and email:
        return jsonify({ 'message': 'Please complete all required fields!' }), 401
    try:
        new_user = User.create_user( username = username, password = password, email = email, image = image )
        return jsonify({ 'message': f'Congratulations { new_user.username }, your account was successfully created!', 'data': {
            'id': new_user.id,
            'username': new_user.username,
            'email': new_user.email,
            'image': new_user.image,
            'created_at': new_user.created_at
        }}), 201
    except ValueError as e: 
       return jsonify({'errors': {'message': str(e)}}), 400
    except Exception as e:
        print( f'500: { e }' )
        return jsonify({'errors': {'message': str(e)}}), 500



