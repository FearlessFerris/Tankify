# Error Handlers Implementation 


# Dependencies 
from flask import jsonify 
from functools import wraps 


# Necessary Files 


# Error Handlers 
# def error_handler( status_code, message ):
#     """ Error Handler """

#     def decorator( func ):
#         @wraps( func )

#         def wrapper( *args, **kwargs ):



def log_decorator( func ):
    @wraps( func )
    def wrapper( *args, **kwargs ):
        print( f'Running function: { func.__name__ }' )
        result = func( *args, **kwargs )
        print( f'Finished function: { func.__name__ }' )
        return result 
    return wrapper 


@log_decorator
def say_hello():
    print( 'Hello World!!!' )


say_hello()