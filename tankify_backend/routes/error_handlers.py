# Error Handlers Implementation 


# Dependencies 
from flask import jsonify 
from functools import wraps 


# Necessary Files 
#

# Error Handlers 
def error_handler( status_code, message ):
    """ Error Handler """

    def decorator( func ):
        @wraps( func )

        def wrapper( *args, **kwargs ):
            try:
                return func(*args, **kwargs)
            except ValueError as ve:
                response = {
                    "status": "error",
                    "message": str(ve)
                }
                return jsonify(response), 400
            except KeyError as ke:
                response = {
                    "status": "error",
                    "message": f"Missing key: {str(ke)}"
                }
                return jsonify(response), 400
            except Exception as e:
                response = {
                    "status": "error",
                    "message": message,
                    "details": str(e)
                }
                return jsonify(response), status_code
        return wrapper 
    return decorator
    

