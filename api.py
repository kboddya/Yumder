from google import genai
from google.genai import types
from flask import Flask, request, jsonify
import logging, json
from flask_cors import CORS

logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
CORS(app)  
client = genai.Client(api_key="AIzaSyCfZM4xjA67sLx9hrt1T31CydDpwIu3Ddc")
client_list = []

def create_client(email, password):
    for client in client_list:
        if client['name'] == email and client['password'] == password:
            return
    client_list.append({"name": email, "password": password})

def get_client(email, password):
    for client in client_list:
        if client['name'] == email and client['password'] == password:
            return client 
    return None



def generate_ingredients(image_bytes):
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=[
                types.Part.from_bytes(
                    data=image_bytes,
                    mime_type='image/jpeg',
                ), 
                "Extract all food ingredients from this image and return them as a comma-separated list in JSON format: {'ingredients': 'ingredient1, ingredient2, ingredient3'}"
            ], 
            config=types.GenerateContentConfig(
                responseMimeType="application/json", 
                responseSchema={
                    "type": "object",
                    "properties": {
                        "ingredients": {"type": "string"}
                    }
                }
            )
        )
        return response
    except Exception as e:
        logging.error(f"Error generating ingredients: {e}")
        return None

def generate_recipes(ingredients):
    """
    Create a recipe JSON from provided ingredients (list or string).
    Returns the raw model response (with .text) or None on error.
    """
    try:
        # Normalize ingredients to a readable comma-separated string
        if isinstance(ingredients, (list, tuple)):
            ingredients_str = ", ".join(map(str, ingredients))
        else:
            ingredients_str = str(ingredients).strip().replace('\n', ', ').replace(';', ', ')

        prompt = (
            "Create a single recipe from these ingredients in valid JSON with EXACT fields: "
            "name, ingredients, instructions, time_consumed, energy_value_score. "
            "Return ONLY JSON, no code fences."
        )

        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=[
                types.Part.from_text(text=f"Ingredients: {ingredients_str}"),
                types.Part.from_text(text=prompt),
            ],
            config=types.GenerateContentConfig(
                responseMimeType="application/json",
                responseSchema={
                    "type": "object",
                    "properties": {
                        "name": {"type": "string"},
                        "ingredients": {"type": "string"},
                        "instructions": {"type": "string"},
                        "time_consumed": {"type": "string"},
                        "energy_value_score": {"type": "number"},
                    },
                    "required": ["name", "ingredients", "instructions", "time_consumed", "energy_value_score"],
                },
                temperature=0.7,
            ),
        )
        return response
    except Exception as e:
        logging.error(f"Error generating recipes: {e}")
        return None

@app.route('/upload', methods=['POST'])
def upload_image():
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No image file provided"}), 400
            
        image_bytes = request.files['image'].read()
        result = generate_ingredients(image_bytes)
        
        if not result:
            return jsonify({"error": "Failed to process image"}), 500
            
        if hasattr(result, 'text'):
            try:
                ingredients_data = json.loads(result.text)
                return jsonify(ingredients_data)
            except json.JSONDecodeError:
                ingredients_text = result.text
                if "ingredients" in ingredients_text.lower():
                    return jsonify({"ingredients": ingredients_text})
                else:
                    return jsonify({"ingredients": ingredients_text})
        else:
            return jsonify({"error": "Unexpected response format from AI"}), 500
            
    except Exception as e:
        logging.error(f"Error in upload_image: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/upload_json', methods=['POST'])
def upload_json():
    logging.info("Step 1: Getting JSON from request")
    data = request.get_json()
    logging.info(f"Step 2: Received JSON data: {data}")

    if not data or 'ingredients' not in data:
        logging.info("Step 3: No ingredients provided in data")
        return jsonify({"error": "No ingredients provided"}), 400

    ingredients = data.get('ingredients', '')
    logging.info(f"Step 4: Ingredients: {ingredients}")

    logging.info("Step 5: Calling generate_recipes")
    result = generate_recipes(ingredients)
    logging.info(f"Step 6: Result from generate_recipes: {result}")

    if not result:
        logging.info("Step 7: Failed to generate recipes")
        return jsonify({"error": "Failed to generate recipes"}), 500

    if hasattr(result, 'text'):
        logging.info(f"Step 8: Result has text attribute: {getattr(result, 'text', None)}")
        try:
            recipes_data = json.loads(result.text)
            logging.info(f"Step 9: Successfully parsed JSON: {recipes_data}")
            return jsonify(recipes_data)
        except json.JSONDecodeError as e:
            logging.error(f"Step 10: Failed to parse JSON: {e}")
            logging.error(f"Step 11: Raw response: {result.text}")

            try:
                cleaned_text = result.text.replace('```json', '').replace('```', '').strip()
                recipes_data = json.loads(cleaned_text)
                logging.info(f"Step 12: Successfully parsed cleaned JSON: {recipes_data}")
                return jsonify(recipes_data)
            except Exception as e2:
                logging.error(f"Step 13: Failed to parse cleaned JSON: {e2}")
                return jsonify({"error": "AI returned invalid JSON", "raw_response": result.text}), 500
    else:
        logging.info("Step 14: Unexpected response format from AI (no text attribute)")
        return jsonify({"error": "Unexpected response format from AI"}), 500

@app.route('/sign_up', methods=['POST'])
def sign_up():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        # Simulate user creation
        new_user = create_client(email, password)
        if new_user:
            return jsonify({"status": "success", "message": "User created successfully"}), 201
        else:
            return jsonify({"status": "error", "message": "User creation failed"}), 500
    except Exception as e:
        logging.error(f"Error in sign_up: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        user = get_client(email, password)
        if user:
            return jsonify({"status": "success", "message": "Login successful", "user": user}), 200
        else:
            return jsonify({"status": "error", "message": "Invalid email or password"}), 401
    except Exception as e:
        logging.error(f"Error in login: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    logging.info("Starting Flask server on 0.0.0.0:5001")
    app.run(host='0.0.0.0', port=5001, debug=True)