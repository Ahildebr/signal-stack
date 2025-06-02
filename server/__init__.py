from flask import Flask
from .config import Config
from .models import db, ma

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    ma.init_app(app)

    @app.route('/')
    def index():
        return {'message': 'Hello from clean Flask'}

    return app
