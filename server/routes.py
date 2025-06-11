from flask import Blueprint, request, jsonify
from .models import *
from datetime import datetime

api = Blueprint('api', __name__)

@api.route('/posts', methods=['GET', 'POST'])
def posts():
    if request.method == 'POST':
        
        json_data = request.get_json()
        post_schema = TikTokPostSchema()

        try:
            new_post = post_schema.load(json_data)
            db.session.add(new_post)
            db.session.commit()
            return jsonify(post_schema.dump(new_post)), 201
        except Exception as e:
            return jsonify({'error': str(e)}), 400
    
    elif request.method == 'GET':
        
        try:
            posts = TikTokPost.query.all()
            post_schema = TikTokPostSchema(many=True)
            return jsonify(post_schema.dump(posts)), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 400

@api.route('/posts/<int:post_id>', methods=['GET', 'PATCH'])
def get_post(post_id):
   
   post = TikTokPost.query.get_or_404(post_id)


   if request.method == 'GET':
    post_schema = TikTokPostSchema()
    return jsonify(post_schema.dump(post)), 200
   
   elif request.method == 'PATCH':
    json_data = request.get_json()
    post_schema = TikTokPostSchema(partial=True)
   
   
    try:
        post = TikTokPost.query.get_or_404(post_id)
        post_schema = TikTokPostSchema()
        return jsonify(post_schema.dump(post)), 200
    except Exception as error:
        return jsonify({'error': str(error)}), 404