# Tank Routes Implementation 


# Dependencies 
from flask import Flask, request, jsonify, session, Blueprint 
import requests 
import os 
from sqlalchemy import func
from dotenv import load_dotenv


# Necessary Files 
from models import db, Tank 


# Define a blueprint for routes 
tank_routes = Blueprint( 'tank_routes', __name__ )


# Load Environmental Variables 
load_dotenv()
WG_API_KEY = os.getenv( 'WG_API_KEY' )
WOT_CDN_BASE = 'https://na-wotp.wgcdn.co/dcont/tankopedia_images/'


# Tank Routes 


# Retrieve all / filtered Tanks Route 
@tank_routes.route('/api/tanks/all', methods=['GET'])
def all_tanks():
    """ Retrieve filtered Tanks from the database """

    try:
        page = request.args.get( 'page', default=1, type=int )
        per_page = request.args.get('per_page', default=1, type=int )
        search = request.args.get( 'search', default = None, type = str )
        nation = request.args.get( 'nation', default=None, type=str )
        tank_type = request.args.get( 'type', default=None, type=str )
        tier = request.args.get( 'tier', default=None, type=str )

        query = Tank.query

        if search: 
            query = query.filter(Tank.name.ilike( f'%{ search }%' ) )
            print( f'Search Query: { query }' )
        if nation:
            print( nation )
            query = query.filter(Tank.nation.ilike(f'%{nation}%'))
        if tank_type:
            formatted_type = tank_type.replace(" ", "").lower()
            query = query.filter(func.lower(Tank.type) == formatted_type)
        if tier:
            query = query.filter(Tank.tier == tier)

        tanks = query.paginate( page=page, per_page=per_page, error_out=False )
        tank_list = [tank.all_tanks() for tank in tanks.items]

        return jsonify({
            'message': 'Successfully retrieved tanks!',
            'data': tank_list,
            'total_pages': tanks.pages,
            'current_page': page
        })
    except Exception as e:
        print(f'Error occurred while fetching tanks: {e}')
        return jsonify({'message': 'Failed to fetch data'}), 500


# Retrieve specific Tank Instance Route 
@tank_routes.route( '/api/tanks/<tank_id>', methods = [ 'GET' ] )
def get_tank( tank_id ): 
    """ Retrieve Tank by ID """

    try:
        
        tank = Tank.query.get( tank_id )
        print( tank )
        if tank: 
            return jsonify({ 
                'message': 'Successfully retrieved tank!', 
                'data': tank.show_info() 
            })
        else:
            return jsonify({ 'message': 'Error, tank not found' }), 404 
    except Exception as e: 
        print( f'Error occurred while fetching tank by ID: { e }' )
        return jsonify({ 'message': 'Failed to fetch data' }), 500 
    

