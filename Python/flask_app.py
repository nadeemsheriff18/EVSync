from flask import Flask, request, jsonify
import pandas as pd
import pickle
from flask_cors import CORS




# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow all origins

# or to allow only your frontend:
CORS(app, origins=["http://localhost:8081"])
CORS(app, resources={r"/predict": {"origins": "*"}})

# Load trained model
with open("speed_prediction_model2.pkl", "rb") as f:
    model = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from request
        data = request.get_json()

        # Extract input values
        battery_percentage = data.get("battery_percentage")
        distance_km = data.get("distance_km")

        # Validate input
        if battery_percentage is None or distance_km is None:
            return jsonify({"error": "Missing input values"}), 400

        # Convert input into DataFrame
        input_data = pd.DataFrame([[battery_percentage, distance_km]], 
                                  columns=['battery_percentage', 'distance_km'])

        # Predict speed
        predicted_speed = model.predict(input_data)[0]

        # Return JSON response
        return jsonify({"predicted_speed_kmph": round(predicted_speed, 2)})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
