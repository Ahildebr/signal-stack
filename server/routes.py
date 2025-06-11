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
            post_schema.load(json_data, instance=post)
            db.session.commit()
            return jsonify(post_schema.dump(post)), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 400
        



@api.route('/posts/stats', methods=['GET'])
def get_posts_stats():
    
    try: 
        total_posts = TikTokPost.query.count()
        total_views = db.session.query(db.func.sum(TikTokPost.views)).scalar() or 0 
        total_likes = db.session.query(db.func.sum(TikTokPost.likes)).scalar() or 0 
        total_shares = db.session.query(db.func.sum(TikTokPost.shares)).scalar() or 0 

        #Calculate the averages
        avg_views = total_views / total_posts if posts > 0 else 0 
        avg_likes = total_likes / total_posts if posts > 0 else 0 
        avg_shares = total_shares / total_posts if posts > 0 else 0 

        #For the VPN'd Content
        vpn_usage = db.session.query(
            TikTokPost.used_vpn, 
            db.func.count(TikTokPost.id).label('count')
        ).group_by(TikTokPost.used_vpn).all()

        #to.dict
        vpn_stats = {str(result.used_vpn): result.count for result in vpn_usage}

        stats = {
            'total_posts' : total_posts,
            'total_likes' : total_likes, 
            'total_views' : total_views, 
            'total_shares' : total_shares, 
            'average_likes' : round(avg_likes, 2),
            'average_views' : round(avg_views, 2),
            'average_shares' : round(avg_shares, 2), 
            'vpn_usage' : vpn_stats
                }
        return jsonify(stats), 200 

    except Exception as error: 
        return jsonify({'error': str(error)}), 500




@api.route('/posts/trends', methods=['GET'])
def get_posts_trends():
    try:
        # Import at function level to avoid circular imports
        from sqlalchemy import extract, func
        
        # Query posts grouped by month/year with aggregated stats
        trends_query = db.session.query(
            # Extract year and month from posted_at datetime
            extract('year', TikTokPost.posted_at).label('year'),
            extract('month', TikTokPost.posted_at).label('month'),
            
            # Aggregate functions for each month
            func.count(TikTokPost.id).label('post_count'),
            func.sum(TikTokPost.views).label('total_views'),
            func.sum(TikTokPost.likes).label('total_likes'),
            func.sum(TikTokPost.shares).label('total_shares'),
            func.avg(TikTokPost.views).label('avg_views'),
            func.avg(TikTokPost.likes).label('avg_likes'),
            func.avg(TikTokPost.shares).label('avg_shares')
        ).filter(
            # Only include posts that have a posted_at date
            TikTokPost.posted_at.isnot(None)
        ).group_by(
            # Group by year and month to create time buckets
            extract('year', TikTokPost.posted_at),
            extract('month', TikTokPost.posted_at)
        ).order_by(
            # Order chronologically (oldest first)
            extract('year', TikTokPost.posted_at),
            extract('month', TikTokPost.posted_at)
        ).all()
        
        # Transform database results into frontend-friendly format
        trends_data = []
        for result in trends_query:
            # Create a date string for Recharts X-axis
            date_label = f"{int(result.year)}-{int(result.month):02d}"
            
            # Build data point object
            trend_point = {
                'period': date_label,
                'year': int(result.year),
                'month': int(result.month),
                'post_count': result.post_count,
                'total_views': result.total_views or 0,
                'total_likes': result.total_likes or 0,
                'total_shares': result.total_shares or 0,
                'avg_views': round(float(result.avg_views or 0), 2),
                'avg_likes': round(float(result.avg_likes or 0), 2),
                'avg_shares': round(float(result.avg_shares or 0), 2)
            }
            
            trends_data.append(trend_point)
        
        # Calculate growth rates between periods
        for i in range(1, len(trends_data)):
            current = trends_data[i]
            previous = trends_data[i-1]
            
            # Calculate percentage growth for views
            if previous['total_views'] > 0:
                views_growth = ((current['total_views'] - previous['total_views']) / previous['total_views']) * 100
                current['views_growth_rate'] = round(views_growth, 2)
            else:
                current['views_growth_rate'] = 0
        
        # Build comprehensive response
        response = {
            'trends': trends_data,
            'summary': {
                'total_periods': len(trends_data),
                'date_range': {
                    'start': trends_data[0]['period'] if trends_data else None,
                    'end': trends_data[-1]['period'] if trends_data else None
                }
            }
        }
        
        return jsonify(response), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500