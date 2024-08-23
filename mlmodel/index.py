from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
from model import chatbot
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

UPLOAD_FOLDER = 'public'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# client = Groq(api_key='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')

state={'messages': [{'role': 'system', 'content': "You are VK Singh, a male officer from the Defence Research & Development Organisation (DRDO)"}],'resume_text_chunks': "My name is Rohan", 'about_DRDO_chunks': "DRDO is Defense Research and Development", 'about_job_chunks':"JRF"}
resumeLocalPath = ""

@app.route("/predict",methods = ['POST'])
def predict():


    data = request.get_json()
    query = data.get('query')

    state['messages'].append({'role': 'user', 'content': query})

    response_text = chatbot(query, state)

    state['messages'].append({'role': 'assistant', 'content': response_text})

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

    resumeLocalPath = file_path

    return jsonify({
        'message' : 'file uploaded successfully',
        'success' : True
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)