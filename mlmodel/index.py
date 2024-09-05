from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
from model import chatbot
from werkzeug.utils import secure_filename
import os
from finalModel import get_response,upload_Resume,intitializeInterviewee


app = Flask(__name__)

# app.use(cors())

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

UPLOAD_FOLDER = 'public'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# client = Groq(api_key='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')



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
        'message' : 'file uploaded successfully',
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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

