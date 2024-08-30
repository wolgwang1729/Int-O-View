from flask import Flask, request, jsonify
from groq import Groq
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
client = Groq(api_key="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")

# Initialize conversation history
conversation_history = [
    {"role": "system", "content": "You are an assistant helping with interview evaluations."},
]

def final_dashboard_json():
    prompt = """Please provide a summary of the interview using the following JSON format:

    ```json
    {
    "BasicDetails": {
        "Name": "",
        "Vacancy": "",
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
    }
    }

    Instructions:

    BasicDetails:

    Name: The name of the candidate.
    Vacancy: The position or role for which the interview was conducted.
    SkillsNeeded: List of skills required for the position.
    Scores:

    EducationalBackgroundScore: Score based on the candidate's educational qualifications.
    Experience: Score based on the candidate's relevant work experience.
    InterpersonalCommunication: Score based on the candidate's ability to communicate and interact effectively.
    TechnicalKnowledge: Score based on the candidate's technical skills and knowledge.
    OverallScore: Overall performance score of the candidate.
    InterviewSummary:

    PositivePoints: Key strengths or positive aspects observed during the interview.
    NegativePoints: Key weaknesses or areas of concern noted during the interview.
    Please ensure the output is strictly in the JSON format provided and reflects a professional evaluation of the interview. Avoid including any speculative or non-factual information.
    """
    # Use a valid role like "user" for the prompt
    conversation_history.append({"role": "user", "content": prompt})
    chat_completion = client.chat.completions.create(
                messages=conversation_history,
                model="llama3-8b-8192",
            )
    response_text = chat_completion.choices[0].message.content
    return response_text

@app.route('/start_interview', methods=['POST'])
def start_interview():
    data = request.json
    vacancy = data.get('vacancy', '')
    skills = data.get('skills', [])
    
    global conversation_history
    conversation_history = [
        {"role": "system", "content": f"You are an assistant responsible for conducting a professional interview for a job vacancy for {vacancy}. Your objective is to thoroughly assess the candidate's technical skills specifically {skills}, problem-solving abilities, and cultural fit. Maintain a formal and professional tone throughout the interview. If the candidate provides irrelevant responses, redirect them to focus on the interview questions. Limit the length of questions to 30-50 words, and evaluate the candidate's overall performance. Be concise and clear in your questions and responses."},
    ]
    
    return jsonify({"message": "Interview started successfully"})

@app.route('/get_response', methods=['POST'])
def get_response():
    user_input = request.json.get('user_input', '')
    conversation_history.append({"role": "user", "content": user_input})

    chat_completion = client.chat.completions.create(
            messages=conversation_history,
            model="llama3-8b-8192",
        )
    response_text = chat_completion.choices[0].message.content
    conversation_history.append({"role": "assistant", "content": response_text})
    
    return jsonify({"response": response_text})

@app.route('/end_interview', methods=['GET'])
def end_interview():
    summary = final_dashboard_json()
    clean_text = summary.replace('\\n', '').replace('\\', '')

    # Extract the JSON part from the cleaned text
    start_index = clean_text.find('{')
    end_index = clean_text.rfind('}') + 1
    json_str = clean_text[start_index:end_index]

    # Load the JSON data
    try:
        data = json.loads(json_str)
        return jsonify({"summary": data})
    except json.JSONDecodeError as e:
        print("Error decoding JSON:", e)
    else:
        # Pretty print the JSON data
        print(json.dumps(data, indent=2))

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=5500)