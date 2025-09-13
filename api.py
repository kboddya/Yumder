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

def initialize_client(email, password, status="free"):
    for client in client_list:
        if client['name'] == email and client['password'] == password:
            client['status'] = status  # Update status if user exists
            return
    client_list.append({"name": email, "password": password, "status": status})

def get_client(email, password):
    for client in client_list:
        if client['name'] == email and client['password'] == password:
            return client  # Now includes 'status'
    return None

def detect_plan(status):
    match status:
        case "free":
            return "Create exactly 1 recipe from these ingredients in valid JSON format with these exact fields: name, ingredients, instructions, time_consumed, energy_value_score. Make sure the response is valid JSON that can be parsed."
        case "pro":
            return "Create exactly 2 different recipes from these ingredients in valid JSON format with these exact fields: name, ingredients, instructions, time_consumed, energy_value_score, url_to_picture. Make sure the response is valid JSON that can be parsed."

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

def generate_recipes(ingredients, plan):
    try:
        prompt = detect_plan(plan)
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=[
                types.Part.from_text(f"Ingredients: {ingredients}"),
                prompt
            ], 
            config=types.GenerateContentConfig(
                responseMimeType="application/json",
                temperature=0.7
            )
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
            
        # Extract text from response
        if hasattr(result, 'text'):
            try:
                ingredients_data = json.loads(result.text)
                return jsonify(ingredients_data)
            except json.JSONDecodeError:
                # If not valid JSON, try to extract ingredients from text
                ingredients_text = result.text
                if "ingredients" in ingredients_text.lower():
                    # Try to find ingredients in the text
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
    try:
        data = request.get_json()
        logging.info(f"Received JSON data: {data}")
        
        if not data or 'ingredients' not in data:
            return jsonify({"error": "No ingredients provided"}), 400
            
        ingredients = data.get('ingredients', '')
        plan = data.get('plan', 'free')
        
        result = generate_recipes(ingredients, plan)
        
        if not result:
            return jsonify({"error": "Failed to generate recipes"}), 500
            
        # Extract text from response
        if hasattr(result, 'text'):
            try:
                recipes_data = json.loads(result.text)
                return jsonify(recipes_data)
            except json.JSONDecodeError as e:
                logging.error(f"Failed to parse JSON: {e}")
                logging.error(f"Raw response: {result.text}")
                
                # Try to fix common JSON issues
                try:
                    # Sometimes Gemini adds markdown code blocks
                    cleaned_text = result.text.replace('```json', '').replace('```', '').strip()
                    recipes_data = json.loads(cleaned_text)
                    return jsonify(recipes_data)
                except:
                    return jsonify({"error": "AI returned invalid JSON", "raw_response": result.text}), 500
        else:
            return jsonify({"error": "Unexpected response format from AI"}), 500
            
    except Exception as e:
        logging.error(f"Error in upload_json: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/sign_in', methods=['POST'])
def sign_in():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        client = get_client(email, password)
        if client:
            plan_status = client['status']
            prompt = detect_plan(plan_status)
            return jsonify({"status": "success", "message": "Sign-in processed"})
        else:
            return jsonify({"status": "error", "message": "Invalid credentials"}), 401
    except Exception as e:
        logging.error(f"Error in sign_in: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"})


if __name__ == "__main__":
    logging.info("Starting Flask server on 0.0.0.0:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)