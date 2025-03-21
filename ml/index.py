from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from groqModel import get_response,upload_Resume,intitializeInterviewee,final_dashboard_json
import json
import re
from dotenv import load_dotenv

load_dotenv()


app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": os.getenv('CLIENT_ORIGIN')}})

UPLOAD_FOLDER = 'ml/public'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route("/predict",methods = ['POST'])
def predict():


    data = request.get_json()
    query = data.get('query')

    response_text = get_response(query)

    return jsonify({
        'message' : response_text
    })


@app.route("/upload",methods = ['POST'])
def upload():
    if 'resume' not in request.files:
        return jsonify({
            'message' : "resume not sent",
            'success' : False 
        }),400

    file = request.files['resume']

    if file.filename == '':
        return jsonify({
            'message' : 'no selected file',
            'success' : False
        })
    
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'],filename)
    file.save(file_path)

    print(file_path)
    
    upload_Resume(file_path)

    return jsonify({
        'message' : 'file uploaded successfully !',
        'success' : True
    })



@app.route("/setUser",methods = ['POST'])
def setUser():

    data = request.get_json()
    # name = data.get("name")
    post = data.get("post")

    intitializeInterviewee(post)

    return jsonify({
        'message' : 'interviewee initialized successfully !',
        'success' : True
    })

@app.route('/dashboardData', methods=['GET'])
def end_interview():
    summary = final_dashboard_json()
    clean_text = summary.replace('\\n', '').replace('\\', '')

    # Extract the JSON part from the cleaned text
    start_index = clean_text.find('{')
    end_index = clean_text.rfind('}') + 1
    json_str = clean_text[start_index:end_index]
    json_str = re.sub(r'//.*', '', json_str)

    # Load the JSON data
    try:
        data = json.loads(json_str)
        print(jsonify({"summary": data}))
        return jsonify({"summary": data})
    except json.JSONDecodeError as e:
        print("Error decoding JSON:", e)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.getenv('FLASK_PORT'))