from PyPDF2 import PdfReader
from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv() 

# Variables for PDF resume and vacancy details
uploaded_file = ""
text = ""
resumeSummary = ""
vacancy = ""
conversation_history = []
dashboardData=""

client=Groq(api_key=os.getenv('GROQ_API_KEY'))

def thinkRemover(text):
    while("</think>" in text):
        text = text.split("</think>")[-1]
    while("<think>" in text):
        text = text.split("<think>")[-1]
    return text

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


        # Prepare prompt message for resume summary
        prompt_message_summary = (
            f"You are a Resume Analyser. Analyze the resume text {text} "
            "Provide the summary for the resume considering marks percentage, college ranking, "
            "experience, extracurriculars, positions of responsibility, etc."
        )

        promptMessages = [
        {"role": "system", "content": "You are an AI assistant that only sumarises text. You don't say anything apart from the summary."},
        {"role": "user", "content": prompt_message_summary}]

        completion = client.chat.completions.create(model="deepseek-r1-distill-llama-70b",messages=promptMessages)
        response=thinkRemover(completion.choices[0].message.content)
        resumeSummary = response
        print(resumeSummary)
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
    f"appropriate follow-up questions from the resume. Throughout the interview, maintain a formal and "
    f"professional tone. If the candidate provides irrelevant responses, politely but firmly redirect them to focus on the "
    f"interview questions. Note: Try to limit the length of questions to 20-25 words. If the candidate continues to provide "
    f"irrelevant answers or engages in unproductive behavior, calmly inform them that the interview cannot proceed without "
    f"serious engagement, and if necessary, end the interview by stating that the session will be concluded due to a lack of "
    f"relevant responses. Ensure that each question is asked clearly and concisely, and avoid overwhelming the candidate by "
    f"limiting the number of questions asked at once. At the conclusion of the interview, you need to evaluate the candidate's "
    f"overall performance. Please try to ask one question at a time and try to be easy in asking questions. Resume summary:{resumeSummary} "
)}
)

# Final dashboard JSON response
def final_dashboard_json():
    global dashboardData
    if(dashboardData):
        return dashboardData
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
    completion = client.chat.completions.create(model="gemma2-9b-it",messages=conversation_history)
    response_text=thinkRemover(completion.choices[0].message.content)
    dashboardData=response_text
    conversation_history.append({"role": "assistant", "content": response_text})
    print(dashboardData)
    return dashboardData

# Function to get interview responses
def get_response(user_input):
    if user_input.lower() == "exit":
        return final_dashboard_json()
    else:
        conversation_history.append({"role": "user", "content": user_input})
    
    try:
        completion = client.chat.completions.create(model="gemma2-9b-it",messages=conversation_history)
        response_text=thinkRemover(completion.choices[0].message.content)
        conversation_history.append({"role": "assistant", "content": response_text})
        print(conversation_history)
        return response_text
    except Exception as e:
        return "oops error"

