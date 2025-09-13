# from flask import Blueprint, request, jsonify
# from backend.extensions import db
# from backend.models import Submission

# api = Blueprint("api", __name__)

# @api.route("/submissions", methods=["POST"])
# def create_submission():
#     # Citește JSON-ul trimis de frontend
#     data = request.get_json(silent=True) or {}

#     required = ["name", "email", "message"]
#     missing = [f for f in required if not data.get(f)]
#     if missing:
#         return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

#     sub = Submission(
#         name=data["name"].strip(),
#         email=data["email"].strip(),
#         message=data["message"].strip(),
#     )
#     db.session.add(sub)
#     db.session.commit()

#     return jsonify({
#         "id": sub.id,
#         "name": sub.name,
#         "email": sub.email,
#         "message": sub.message,
#         "created_at": sub.created_at.isoformat() + "Z"
#     }), 201

# from backend.models import Recipe, User

# @api.route("/recipes", methods=["POST"])
# def create_recipe():
#     data = request.get_json(silent=True) or {}
#     required = ["title", "ingredients", "steps", "user_id"]
#     missing = [k for k in required if not data.get(k)]
#     if missing:
#         return jsonify({"error": f"Lipsesc câmpurile: {', '.join(missing)}"}), 400

#     # validări de bază
#     if not isinstance(data["ingredients"], list) or not isinstance(data["steps"], list):
#         return jsonify({"error": "ingredients și steps trebuie să fie liste"}), 400

#     # verifică user-ul
#     user = User.query.get(data["user_id"])
#     if not user:
#         return jsonify({"error": "User inexistent"}), 404

#     r = Recipe(
#         title=data["title"].strip(),
#         image_url=(data.get("image_url") or "").strip() or None,
#         ingredients=[str(x).strip() for x in data["ingredients"]],
#         steps=[str(x).strip() for x in data["steps"]],
#         prep_time_min=int(data.get("prep_time_min") or 0) or None,
#         user_id=user.id,
#     )
#     db.session.add(r)
#     db.session.commit()

#     return jsonify({
#         "id": r.id,
#         "title": r.title,
#         "image_url": r.image_url,
#         "ingredients": r.ingredients,
#         "steps": r.steps,
#         "prep_time_min": r.prep_time_min,
#         "user_id": r.user_id,
#         "created_at": r.created_at.isoformat() + "Z"
#     }), 201