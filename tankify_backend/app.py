# Main Flask Application File


# Dependencies
from flask import Flask
from flask_cors import CORS
from models import db
from config import Config  # Import Config class
from routes.user import user_routes  # Import your routes
from routes.tank import tank_routes 
from routes.payment import payment_routes


app = Flask(__name__)
CORS(app)


# Load configurations from config.py
app.config.from_object(Config)


# Initialize the database
db.init_app(app)


# Register routes from the blueprint
app.register_blueprint( user_routes )
app.register_blueprint( tank_routes )
app.register_blueprint( payment_routes )


if __name__ == '__main__':
    app.run(debug=True)
