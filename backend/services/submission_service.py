# backend/services/submission_service.py
from typing import Dict
from backend.models import Submission
from backend.services.validators import validate_email

def _fallback_name_from_email(email: str) -> str:
    try:
        local = (email or "").split("@", 1)[0].strip()
        return local or "Anonim"
    except Exception:
        return "Anonim"

def create_submission_logic(*, email: str, message: str, session, name: str = None) -> Dict:
    email = (email or "").strip()
    message = (message or "").strip()
    name = (name or "").strip() 

    # validări minime
    if not validate_email(email):
        return {"status": False, "error": "Email invalid"}
    if not message:
        return {"status": False, "error": "Mesajul este obligatoriu"}


    if not name:
        name = _fallback_name_from_email(email)

    sub = Submission(name=name, email=email, message=message)
    session.add(sub)
    try:
        session.commit()
    except Exception:
        session.rollback()
        return {"status": False, "error": "Eroare la salvare (DB)"}

    return {"status": True, "data": {"id": sub.id}}
