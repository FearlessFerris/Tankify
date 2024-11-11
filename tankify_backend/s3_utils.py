# S3 Client Implementation 


# Dependencies 
import os 
import boto3 
from dotenv import load_dotenv


# Necessary Files 
load_dotenv() # Will load environmental variables from my .env file 


# S3 Bucket Name 
BUCKET_NAME = 'tankify-images'


# S3 Client 
def get_s3_client():
    """ Create and return an S3 client instance using environment variables for credentials """

    return boto3.client(
        's3',
        aws_access_key_id = os.getenv( 'AWS_ACCESS_KEY_ID' ),
        aws_secret_access_key = os.getenv( 'AWS_SECRET_ACCESS_KEY' ),
        region_name = 'us-east-2'
    )