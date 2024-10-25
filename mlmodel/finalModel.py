import requests
from PyPDF2 import PdfReader

# API on demand credentials
api_key = '6gyVcaRy6r2AsTaq1lLFVQTZj4i7pNIM'
external_user_id = '123'

# Variables for PDF resume and vacancy details
uploaded_file = ""
text = ""
resumeSummary = ""
vacancy = ""
conversation_history = []

# Function to create a chat session
def create_chat_session():
    url = 'https://api.on-demand.io/chat/v1/sessions'
    headers = {'apikey': api_key}
    body = {"pluginIds": [], "externalUserId": external_user_id}
    response = requests.post(url, headers=headers, json=body)
    return response.json()['data']['id']

# Function to submit a query with the full conversation history
def submit_query(session_id, query):
    url = f'https://api.on-demand.io/chat/v1/sessions/{session_id}/query'
    headers = {'apikey': api_key}
    
    # Join all conversation messages in history into a single query
    full_conversation = "\n".join([f"{msg['role']}: {msg['content']}" for msg in conversation_history])
    body = {
        "endpointId": "predefined-openai-gpt4o",
        "query": full_conversation + f"\nuser: {query}",
        "pluginIds": ["plugin-1712327325", "plugin-1713962163"],
        "responseMode": "sync"
    }
    
    response = requests.post(url, headers=headers, json=body)
    return response.json()['data']['answer']

# File Uploader for PDF Resumes
def upload_Resume(path):
    global resumeSummary
    uploaded_file = path
    text = ""

    if uploaded_file:
        with open(str(uploaded_file), 'rb') as file:
            pdf_reader = PdfReader(file)
            num_pages = len(pdf_reader.pages)
            for page_num in range(num_pages):
                page = pdf_reader.pages[page_num]
                text += page.extract_text()

        print(text)

        # Prepare prompt message for resume summary
        prompt_message_summary = (
            f"You are a Resume Analyser. Analyze the following resume text: {text}. "
            "Provide the summary for the resume considering marks percentage, college ranking, "
            "experience, extracurriculars, positions of responsibility, etc."
        )

        # Create session and get summary
        session_id = create_chat_session()
        resumeSummary = submit_query(session_id, prompt_message_summary)
        build_conversation()

# Set up interview context
def intitializeInterviewee(post):
    global vacancy
    vacancy = post

def build_conversation():
    global vacancy, resumeSummary
    conversation_history.append(            
    {"role": "system", "content": (
    f"You are Shreya, a female officer responsible for conducting a professional interview (High level Interview) for a job vacancy for {vacancy}. Your objective is to "
    f"thoroughly assess the candidate's technical skills, problem-solving abilities, and cultural fit for the organization. The interview should be structured to include a mix of technical and psychological questions, along with "
    f"appropriate follow-up questions from the resume {resumeSummary}. Throughout the interview, maintain a formal and "
    f"professional tone. If the candidate provides irrelevant responses, politely but firmly redirect them to focus on the "
    f"interview questions. Note: Try to limit the length of questions to 20-25 words. If the candidate continues to provide "
    f"irrelevant answers or engages in unproductive behavior, calmly inform them that the interview cannot proceed without "
    f"serious engagement, and if necessary, end the interview by stating that the session will be concluded due to a lack of "
    f"relevant responses. Ensure that each question is asked clearly and concisely, and avoid overwhelming the candidate by "
    f"limiting the number of questions asked at once. At the conclusion of the interview, you need to evaluate the candidate's "
    f"overall performance. Please try to ask one question at a time and try to be easy in asking questions.  "
)}
)


# Final dashboard JSON response
def final_dashboard_json():
    session_id = create_chat_session()
    prompt = """Please provide a summary of the interview using the following JSON format:

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

    Name: Candidate's name.
    Vacancy: Position for which the interview was conducted.
    SkillsNeeded: Skills required for the position.
    Scores: Score details (strict marking).
    """
    conversation_history.append({"role": "user", "content": prompt})
    return submit_query(session_id, prompt)

# Function to get interview responses
def get_response(user_input):
    if user_input.lower() == "exit":
        return final_dashboard_json()
    else:
        conversation_history.append({"role": "user", "content": user_input})
    
    try:
        session_id = create_chat_session()
        response_text = submit_query(session_id, user_input)
        conversation_history.append({"role": "assistant", "content": response_text})
        print(conversation_history)
        return response_text
    except Exception as e:
        return "oops error"
