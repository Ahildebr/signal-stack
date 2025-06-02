from flask import Flask
from flask_cors import CORS
from .config import Config
from .routes import api
from .models import db, ma

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)


    db.init_app(app)
    ma.init_app(app)
     
     
    # Register the blueprint
    app.register_blueprint(api, url_prefix='/api')

    with app.app_context():
        db.create_all()

    @app.route('/')
    def index():
        return {'message': 'Hello from clean Flask'}

    return app
