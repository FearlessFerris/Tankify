import os
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()


DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_HOST = os.getenv('DB_HOST')
DB_PORT = os.getenv('DB_PORT')
DB_NAME = os.getenv('DB_NAME')

DATABASE_URL = ( 
    f"postgresql://{ DB_USER }:{ DB_PASSWORD }@{ DB_HOST }:{ DB_PORT }/{ DB_NAME }"
)

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')  # Fallback if not in .env
    SQLALCHEMY_DATABASE_URI = DATABASE_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = os.getenv('DEBUG', True)
