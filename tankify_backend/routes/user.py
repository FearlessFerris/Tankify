# routes.py

from flask import Blueprint

# Define a blueprint for routes
user_routes = Blueprint('user_routes', __name__)

# Homepage route
@user_routes.route('/')
def homepage():
    """ Application Homepage """
    return "<h1>Welcome to Tankify!</h1><p>Your one-stop shop for tanks and tank-related products.</p>"

# Add other routes below as needed
