# User Routes Implementation 


# Dependencies 
from flask import Flask, request, jsonify, session, Blueprint


# Necessary Files 
from models import db, User 
from error_handlers import error_handler


# Define a blueprint for routes
user_routes = Blueprint('user_routes', __name__)


# Homepage route
@user_routes.route('/')
def homepage():
    """ Application Homepage """

    
    return "<h1>Welcome to Tankify!</h1><p>Your one-stop shop for tanks and tank-related products.</p>"


@user_routes.route( '/api/create', methods = [ 'POST' ] )
@error_handler( 400, 'Bad Request - Unable to create user do to invalid input' )
def create_user(): 
    """ Creates User Account Instance """

    data = request.get_json()
    username = data.get( 'username' )
    password = data.get( 'password' )
    email = data.get( 'email' )
    image = data.get( 'image' )

    if not username and password and email:
        return jsonify({ 'message': 'Please complete all required fields!' }), 401
    
    new_user = User.create_user( username = username, password = password, email = email, image = image )
    return jsonify({ 
        'message': f'Congratulations { new_user.username }, your account was successfully created!', 
        'user': {
        'id': new_user.id,
        'username': new_user.username,
        'email': new_user.email,
        'image': new_user.image,
        'created_at': new_user.created_at
    }}), 201


@user_routes.route( '/api/login', methods = [ 'POST' ] )
@error_handler( 401, 'Unauthorized - Invalid credentials provided' )
def login_user():
    """ Login / Authenticate User Instance """

    data = request.get_json()

    if not data or not data.get( 'username' ) or not data.get( 'password' ):
        raise ValueError( 'Username and Password are required!' )
    
    username = data.get( 'username' )
    password = data.get( 'password' )
    user = User.login_user( username, password )
    
    if not user: 
        raise ValueError( 'Invalid Username / Password' )
    
    return jsonify({
        'message': f'Welcome back { user.username }, hope you are well today!',
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'image': user.image,
            'created_at': user.created_at
        } 
    }), 200 
