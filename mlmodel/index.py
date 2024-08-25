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

state={'messages': [{'role': 'system', 'content': "You are VK Singh, a sde recruiter for microsoft"}],'resume_text_chunks': "My name is manav", 'about_DRDO_chunks': "DRDO is Defense Research and Development", 'about_job_chunks':"JRF"}
resumeLocalPath = ""

@app.route("/predict",methods = ['POST'])
def predict():


    data = request.get_json()
    query = data.get('query')

    if (query != 'exit'):
        state['messages'].append({'role': 'user', 'content': query})    

    response_text = chatbot(query, state)

    state['messages'].append({'role': 'assistant', 'content': response_text})
    print(state['messages'])

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

# def final_dashboard_json():
#     prompt = """Please provide a summary of the interview using the following JSON format:

#     ```json
#     {
#     "BasicDetails": {
#         "Name": "",
#         "Vacancy": "",
#         "SkillsNeeded": []
#     },
#     "Scores": {
#         "EducationalBackgroundScore": 0,
#         "Experience": 0,
#         "InterpersonalCommunication": 0,
#         "TechnicalKnowledge": 0,
#         "OverallScore": 0
#     },
#     "InterviewSummary": {
#         "PositivePoints": "",
#         "NegativePoints": ""
#     }
#     }

#     Instructions:

#     BasicDetails:

#     Name: The name of the candidate.
#     Vacancy: The position or role for which the interview was conducted.
#     SkillsNeeded: List of skills required for the position.
#     Scores:

#     EducationalBackgroundScore: Score based on the candidate's educational qualifications.
#     Experience: Score based on the candidate's relevant work experience.
#     InterpersonalCommunication: Score based on the candidate's ability to communicate and interact effectively.
#     TechnicalKnowledge: Score based on the candidate's technical skills and knowledge.
#     OverallScore: Overall performance score of the candidate.
#     InterviewSummary:

#     PositivePoints: Key strengths or positive aspects observed during the interview.
#     NegativePoints: Key weaknesses or areas of concern noted during the interview.
#     Please ensure the output is strictly in the JSON format provided and reflects a professional evaluation of the interview. Avoid including any speculative or non-factual information.
#     """
#     state['messages'].append({"role": "Final Verdict Giver ", "content": prompt})
#     chat_completion = client.chat.completions.create(
#                 messages=state['messages'],
#                 model="llama3-8b-8192",
#             )
#     response_text = chat_completion.choices[0].message.content
#     return response_text
