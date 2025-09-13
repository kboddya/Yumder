from datetime import datetime
from backend.extensions import db
from sqlalchemy import JSON  # <— folosește JSON generic (merge și pe SQLite)

class User(db.Model):
    __tablename__ = "user"  # <— trebuie să fie exact 'user' ca să corespundă FK-ului
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    # poți adăuga câmpuri ulterior (password, name, etc.)

class Submission(db.Model):
    __tablename__ = "submissions"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

class Recipe(db.Model):
    __tablename__ = "recipes"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    image_url = db.Column(db.String(500), nullable=True)
    ingredients = db.Column(db.String(), nullable=False, default=list)
    steps = db.Column(db.String(), nullable=False, default=list)
    prep_time = db.Column(db.String(), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    user = db.relationship("User", backref=db.backref("recipes", lazy=True))
