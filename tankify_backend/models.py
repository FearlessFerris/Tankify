from flask_sqlalchemy import SQLAlchemy 

db = SQLAlchemy()

class Tank( db.Model ):
    """ Tank Class Instance """
    id = db.Column( db.Integer, primary_key = True )
    name = db.Column( db.String( 100 ), nullable = False )



