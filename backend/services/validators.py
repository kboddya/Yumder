def normalize_email(email: str) -> str:
    return (email or "").strip().lower()

def validate_email(email: str) -> bool:
    e = normalize_email(email)
    return bool(e) and "@" in e and "." in e

def validate_password(pw: str) -> bool:
    return bool((pw or "").strip()) and len(pw.strip()) >= 6

def ensure_list(x):
    if x is None:
        return []
    if isinstance(x, str):
        s = x.strip()
        if s.startswith("[") and s.endswith("]"):
            try:
                import json
                val = json.loads(s)
                return [str(p).strip() for p in val if str(p).strip()]
            except Exception:
                pass
        parts = [p.strip() for p in s.split(",")]
        return [p for p in parts if p]
    if isinstance(x, (list, tuple)):
        return [str(p).strip() for p in x if str(p).strip()]
    return []
