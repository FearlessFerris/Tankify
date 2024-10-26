import os
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')  # Fallback if not in .env
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL') or 'postgresql://tankify'  # Fallback
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = os.getenv('DEBUG', True)
