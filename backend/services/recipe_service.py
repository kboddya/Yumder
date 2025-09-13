from typing import Dict, Optional, List
import json
from backend.models import Recipe
from backend.services.validators import ensure_list

def _dump_list_to_str(lst: List[str]) -> str:
    # păstrăm în DB ca JSON string
    return json.dumps(lst, ensure_ascii=False)

def _load_str_to_list(s: Optional[str]) -> List[str]:
    if not s:
        return []
    s = s.strip()
    try:
        val = json.loads(s)
        if isinstance(val, list):
            return [str(x) for x in val]
    except Exception:
        pass
    # fallback: suportă "a, b, c"
    return ensure_list(s)

def create_recipe_logic(
    *,
    user_id: int,
    title: str,
    ingredients,       # list[str] | "a,b,c" | JSON string
    steps,             # list[str] | "a,b,c" | JSON string
    image_url: Optional[str],
    prep_time: Optional[str],  # ex. "15 min", "00:20", "PT20M" – tu decizi formatul
    session
) -> Dict:
    title = (title or "").strip()
    if not title:
        return {"status": False, "error": "Titlul este obligatoriu"}

    ing_list = ensure_list(ingredients)
    steps_list = ensure_list(steps)
    if not ing_list or not steps_list:
        return {"status": False, "error": "Ingredients și steps nu pot fi goale"}

    rec = Recipe(
        title=title,
        image_url=(image_url or None),
        ingredients=_dump_list_to_str(ing_list),
        steps=_dump_list_to_str(steps_list),
        prep_time=(prep_time or None),
        user_id=int(user_id),
    )
    session.add(rec)
    try:
        session.commit()
    except Exception:
        session.rollback()
        return {"status": False, "error": "Eroare la salvare (DB)"}

    return {"status": True, "data": {"id": rec.id}}

def get_recipe_logic(*, recipe_id: int, session) -> Dict:
    rec = session.get(Recipe, int(recipe_id))
    if not rec:
        return {"status": False, "error": "Rețetă inexistentă"}
    return {
        "status": True,
        "data": {
            "id": rec.id,
            "title": rec.title,
            "image_url": rec.image_url,
            "ingredients": _load_str_to_list(rec.ingredients),
            "steps": _load_str_to_list(rec.steps),
            "prep_time": rec.prep_time,
            "user_id": rec.user_id,
            "created_at": rec.created_at.isoformat() + "Z",
        },
    }

def list_recipes_logic(*, user_id: Optional[int], limit: int, session) -> Dict:
    q = session.query(Recipe)
    if user_id is not None:
        q = q.filter(Recipe.user_id == int(user_id))
    q = q.order_by(Recipe.created_at.desc()).limit(max(1, min(int(limit or 50), 100)))
    rows = q.all()
    return {
        "status": True,
        "data": [
            {
                "id": r.id,
                "title": r.title,
                "image_url": r.image_url,
                "ingredients": _load_str_to_list(r.ingredients),
                "steps": _load_str_to_list(r.steps),
                "prep_time": r.prep_time,
                "user_id": r.user_id,
                "created_at": r.created_at.isoformat() + "Z",
            }
            for r in rows
        ],
    }

def update_recipe_logic(
    *,
    recipe_id: int,
    current_user_id: int,
    title: Optional[str] = None,
    ingredients=None,
    steps=None,
    image_url: Optional[str] = None,
    prep_time: Optional[str] = None,
    session
) -> Dict:
    rec = session.get(Recipe, int(recipe_id))
    if not rec:
        return {"status": False, "error": "Rețetă inexistentă"}
    if rec.user_id != int(current_user_id):
        return {"status": False, "error": "Nu ai dreptul să modifici această rețetă"}

    if title is not None:
        if not title.strip():
            return {"status": False, "error": "Titlul nu poate fi gol"}
        rec.title = title.strip()
    if ingredients is not None:
        ing_list = ensure_list(ingredients)
        if not ing_list:
            return {"status": False, "error": "Ingredients nu pot fi goale"}
        rec.ingredients = _dump_list_to_str(ing_list)
    if steps is not None:
        steps_list = ensure_list(steps)
        if not steps_list:
            return {"status": False, "error": "Steps nu pot fi goale"}
        rec.steps = _dump_list_to_str(steps_list)
    if image_url is not None:
        rec.image_url = image_url or None
    if prep_time is not None:
        rec.prep_time = prep_time or None

    try:
        session.commit()
    except Exception:
        session.rollback()
        return {"status": False, "error": "Eroare la salvare (DB)"}

    return {"status": True, "data": {"id": rec.id}}

def delete_recipe_logic(*, recipe_id: int, current_user_id: int, session) -> Dict:
    rec = session.get(Recipe, int(recipe_id))
    if not rec:
        return {"status": False, "error": "Rețetă inexistentă"}
    if rec.user_id != int(current_user_id):
        return {"status": False, "error": "Nu ai dreptul să ștergi această rețetă"}

    try:
        session.delete(rec)
        session.commit()
    except Exception:
        session.rollback()
        return {"status": False, "error": "Eroare la ștergere (DB)"}

    return {"status": True}
