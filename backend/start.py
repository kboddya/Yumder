# app/__init__.py
from flask import Flask
from backend.extensions import init_extensions, db

def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "change-me"
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    init_extensions(app)
    # app.register_blueprint(api, url_prefix="/api")

    #  importă modelele înainte de db.create_all()
    from backend import models  

    with app.app_context():
        db.create_all()  # creează tabelele definite în models.py

    return app
