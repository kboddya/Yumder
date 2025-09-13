from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def init_extensions(app):
    db.init_app(app)
    CORS(app)  # permite cereri din frontend (ex: http://localhost:5173)