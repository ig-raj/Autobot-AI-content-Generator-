from flask import Flask, request, jsonify
from flask_cors import CORS
import cohere

app = Flask(__name__)
CORS(app)  # Enable CORS for all domains

# Initialize Co:here client
COHERE_API_KEY = "r2qyZzWTvlhucdudG1YiiyhjcKqFRIzH36HnzfaG"
co = cohere.Client(COHERE_API_KEY)

@app.route("/generate", methods=["POST"])
def generate():
    try:
        # Get user input from the request
        user_input = request.json.get("user_input", "")
        if not user_input:
            return jsonify({"error": "No user input provided"}), 400

        # Call Co:here API
        response = co.generate(
            model="command-xlarge-nightly",
            prompt=f"The following is a conversation:\nUser: {user_input}\nBot:",
            max_tokens=100,
            temperature=0.7,
            stop_sequences=["User:"]
        )

        # Extract and return the response
        bot_response = response.generations[0].text.strip()
        return jsonify({"bot_response": bot_response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
