from flask import Flask, jsonify
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  

UPLOAD_FOLDER = 'models'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_model():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and file.filename.endswith('.pkl'):
        save_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(save_path)
        return jsonify({"message": f"Model '{file.filename}' uploaded successfully."}), 200
    else:
        return jsonify({"error": "Invalid file type. Only .pkl allowed."}), 400

# @app.route('/api/hello')
# def hello():
#     return jsonify(message="Hello from Flask!")

if __name__ == '__main__':
    app.run(debug=True)
