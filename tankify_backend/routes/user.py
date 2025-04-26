# User Routes Implementation 


# Dependencies 
from flask import Flask, request, jsonify, session, Blueprint


# Necessary Files 
from models import db, User, Currency
from .error_handlers import error_handler


# Define a blueprint for routes
user_routes = Blueprint('user_routes', __name__)


# Homepage route
@user_routes.route('/')
def homepage():
    """ Application Homepage """

    
    return "<h1>Welcome to Tankify!</h1><p>Your one-stop shop for tanks and tank-related products.</p>"


# Get User Route 
@user_routes.route( '/api/get/<user_id>', methods = [ 'GET' ] )
def get_user( user_id ):
    """ Retrieves User Profile Information """

    user = User.query.filter_by( id = user_id ).first()
    if not user: 
        return jsonify({ 'success': False, 'message': 'User not found' }), 404

    return jsonify({ 'success': True, 'user': user.get_user_profile() }), 200 


# Create User Route 
@user_routes.route('/api/create', methods=['POST'])
@error_handler(400, 'Bad Request - Unable to create user due to invalid input')
def create_user():
    """ Creates User Account Instance """

    data = request.form
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    image = request.files.get('image')
    link = data.get('link')

    if not username or not password or not email:
        return jsonify({'message': 'Please complete all required fields!'}), 400

    try:
        new_user = User.create_user(username=username, password=password, email=email)

        if image:
            upload_result = new_user.upload_image(file=image)
            if not upload_result['success']:
                return jsonify({'message': upload_result['error']}), 400

        elif link:
            upload_result = new_user.upload_image(link=link)
            if not upload_result['success']:
                return jsonify({'message': upload_result['error']}), 400

        return jsonify({
            'message': f'Congratulations {new_user.username}, your account was successfully created!',
            'user': new_user.get_user_profile()
        }), 201

    except Exception as e:
        print(f'Error creating new user: {e}')
        return jsonify({'message': 'Unable to create new user. Please try again!'}), 500


# Login User Route
@user_routes.route('/api/login', methods=['POST'])
@error_handler(401, 'Unauthorized - Invalid credentials provided')
def login_user():
    """ Login / Authenticate User Instance """

    data = request.get_json()

    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'message': 'Username and Password are required!'}), 400

    username = data.get('username')
    password = data.get('password')
    user = User.login_user(username, password)

    if not user:
        return jsonify({'message': 'Invalid Username / Password'}), 401

    return jsonify({
        'message': f'Welcome back {user.username}, hope you are well today!',
        'user': user.get_user_profile()
    }), 200


# Edit User Route
@user_routes.route('/api/edit_user/<user_id>', methods=['PUT'])
@error_handler(400, 'Bad Request - Unable to update user profile')
def edit_user(user_id):
    """ Edit User Profile """

    data = request.form
    user = User.query.get(user_id)
    image_file = request.files.get('image')
    image_link = data.get('imageLink')

    if not user:
        return jsonify({'message': 'User not found'}), 404

    try:
        if image_file:
            upload_result = user.upload_image(file=image_file)
            if not upload_result['success']:
                return jsonify({'message': upload_result['error']}), 400
        elif image_link:
            upload_result = user.upload_image(link=image_link)
            if not upload_result['success']:
                return jsonify({'message': upload_result['error']}), 400

        update_data = {key: value for key, value in data.items() if key not in ['image', 'imageLink']}
        update_result = user.update_profile(**update_data)

        if update_result['success']:
            return jsonify(update_result), 200
        else:
            print('Failed to update profile fields')
            return jsonify(update_result), 500

    except Exception as e:
        print(f'Error updating user: {e}')
        return jsonify({'message': 'Unable to update user profile. Please try again!'}), 500
    

# Set User Default Currency
@user_routes.route( '/api/users/<user_id>/default-currency', methods = [ 'PATCH' ] )
@error_handler( 400, 'Bad Request - Unable to update user profile' )
def set_user_default_currency( user_id ):
    """ Sets Default Currency for a User Instance """

    data = request.json
    currency_id = data.get( 'currency_id' )
    user = User.query.filter_by( id = user_id ).first() 
    if not user: 
        return jsonify({ 'success': False, 'message': 'User not found' })
    result = user.set_default_currency( currency_id )
    print( result )
    if result[ 'success' ]:
        return jsonify( result ), 200
    else:
        return jsonify( result ), 400 
    

# Get User Default Currency 
@user_routes.route( '/api/users/<user_id>/default-currency', methods = [ 'GET' ] )
@error_handler( 400, 'Bad Request - Unable to update user profile' )
def get_user_default_currency( user_id ):
    """ Retrieves Default Currency of User Instance """

    user = User.query.filter_by( id = user_id ).first()
    if not user: 
        return jsonify({ 
            'success': False, 
            'message': 'User not found' 
        }), 404
    if not user.default_currency_id:
        return jsonify({ 
            'success': False, 
            'message': 'Default currency not set for this user' 
        }), 404
    
    currency = Currency.query.filter_by( id = user.default_currency_id ).first() 
    if not currency:
        return jsonify({ 
            'success': False, 
            'message': 'Default currency data unavailable' 
        }), 404
    return jsonify({ 
        'success': True, 
        'data': currency.to_dict() 
    }), 200 


