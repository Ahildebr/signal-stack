from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

db = SQLAlchemy()
ma = Marshmallow()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)

    posts = db.relationship('TikTokPost', backref='user', lazy=True)



class TikTokPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False, default="Untitled Post")
    views = db.Column(db.Integer, nullable=False, default=0)
    likes = db.Column(db.Integer, nullable=False, default=0)
    shares = db.Column(db.Integer, nullable=False, default=0)
    posted_at = db.Column(db.DateTime, nullable=False)
    used_vpn = db.Column(db.Boolean, nullable=False, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        exclude = ['password_hash']

class TikTokPostSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = TikTokPost
