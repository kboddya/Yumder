from typing import Dict
from werkzeug.security import generate_password_hash, check_password_hash
from backend.models import User
from backend.services.validators import normalize_email, validate_email, validate_password
from extensions import db

def _validate_password_hash(p: str) -> bool:
    return bool((p or "").strip())

def signup_logic(*, email: str, password_hash: str) -> Dict:
    session = db.session
    email = normalize_email(email)
    if not validate_email(email):
        return {"status": False, "emailError": "Email invalid", "passwordError": ""}

    if not _validate_password_hash(password_hash):
        return {"status": False, "emailError": "", "passwordError": "Parola (hash) lipsă sau invalidă"}

    if session.query(User).filter_by(email=email).first():
        return {"status": False, "emailError": "Email deja folosit", "passwordError": ""}
    #stocare hash
    user = User(email=email, password=password_hash)
    session.add(user)
    try:
        session.commit()
    except Exception:
        session.rollback()
        return {"status": False, "emailError": "Eroare la salvare (DB)", "passwordError": ""}

    return {"status": True, "emailError": "", "passwordError": "", "data": {"userId": user.id, "email": user.email}}


def login_logic(*, email: str, password_hash: str) -> Dict:
    session = db.session
    email = normalize_email(email)
    if not validate_email(email):
        return {"status": False, "emailError": "Email incorect", "passwordError": ""}

    if not _validate_password_hash(password_hash):
        return {"status": False, "emailError": "", "passwordError": "Parola (hash) invalidă"}

    user = session.query(User).filter_by(email=email).first()
    if not user:
        return {"status": False, "emailError": "Email inexistent", "passwordError": ""}

    if user.password != password_hash:
        return {"status": False, "emailError": "", "passwordError": "Parola incorectă"}

    return {"status": True, "emailError": "", "passwordError": "", "data": {"userId": user.id, "email": user.email}}