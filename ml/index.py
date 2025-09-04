from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
# from Agent import get_response,upload_Resume,intitializeInterviewee,final_dashboard_json
from groqModel import get_response,upload_Resume,intitializeInterviewee,final_dashboard_json
import json
import re
from dotenv import load_dotenv

load_dotenv()


app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": os.getenv('CLIENT_ORIGIN')}},supports_credentials=True)

UPLOAD_FOLDER = 'ml/public'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/startServer', methods=['GET'])
def start_server():
    return jsonify({
        'message': 'Server started successfully!',
        'success': True
    })

@app.route("/predict",methods = ['POST'])
def predict():


    data = request.get_json()
    query = data.get('query')

    response_text = get_response(query)

    return jsonify({
        'message' : response_text
    })


@app.route("/upload", methods=['POST'])
def upload():
    if 'resume' not in request.files:
        return jsonify({
            'message': "resume not sent",
            'success': False
        }), 400

    file = request.files['resume']

    if file.filename == '':
        return jsonify({
            'message': 'no selected file',
            'success': False
        })
    
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)
    
    upload_Resume(file_path)
    
    os.remove(file_path)

    return jsonify({
        'message': 'file uploaded successfully !',
        'success': True
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
    try:
        summary = final_dashboard_json()
        clean_text = summary.replace('\\n', '').replace('\\', '')

        # Extract the JSON part from the cleaned text
        start_index = clean_text.find('{')
        end_index = clean_text.rfind('}') + 1
        
        if start_index == -1 or end_index <= start_index:
            raise ValueError("Could not find valid JSON content in response")
            
        json_str = clean_text[start_index:end_index]
        json_str = re.sub(r'//.*', '', json_str)
        print(json_str)

        # Load the JSON data
        data = json.loads(json_str)
        return jsonify({"summary": data})
    except Exception as e:
        print(f"Error processing dashboard data: {str(e)}")
        # Return default JSON with zero values in case of error
        default_data = {
            "BasicDetails": {
                "Name": "XYZ",
                "Vacancy": "Unknown",
                "SkillsNeeded": []
            },
            "Scores": {
                "EducationalBackgroundScore": 0,
                "Experience": 0,
                "InterpersonalCommunication": 0,
                "TechnicalKnowledge": 0,
                "OverallScore": 0
            },
            "InterviewSummary": {
                "PositivePoints": "",
                "NegativePoints": ""
            },
            "DetailedAssessment": {
                "RecommendationStatus": "Not Recommended",
                "InterviewDuration":0,
                "ConfidenceLevel": 0,
                "SkillMatchPercentage": 0,
                "PersonalityTraits": [],
                "TechnicalSkillsBreakdown": []
            },
            "RecommendedLearningPaths": [],
            "CultureFitAnalysis": {
                "TeamworkScore": 0,
                "AdaptabilityScore": 0,
                "Summary": ""
            }
        }
        return jsonify({"summary": default_data})

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    app.run(host='0.0.0.0', port=port)