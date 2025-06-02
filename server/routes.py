from flask import Blueprint, request, jsonify
from .models import *
from datetime import datetime

api = Blueprint('api', __name__)

@api.route('/posts', methods=['POST'])
def create_post():
    #get JSON from SRC and use MMALLOW to validate
    json_data = request.get_json()
    post_schema = TikTokPostSchema()

    try:
        # This validates and creates the instance
        new_post = post_schema.load(json_data)
        
        # Just add it directly to the session
        db.session.add(new_post)
        db.session.commit()

        # Return the created post as JSON
        return jsonify(post_schema.dump(new_post)), 201
    
    except Exception as e:
        return jsonify({'error' : str(e)}), 400
