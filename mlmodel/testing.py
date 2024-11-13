import streamlit as st
from groq import Groq  # Assuming you have the correct import for Groq
from PyPDF2 import PdfReader

# Initialize Groq client
client = Groq(api_key="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")

# Streamlit App Title
st.title("Interview Arena")

# User Input for Vacancy and Skills
vacancy = st.selectbox(
    "For Which post, you are applying",
    ("SDE", "ML-Scientist", "Junior Research Fellow"),
)

skills = st.multiselect(
    "Select the skills",
    ["CP", "WebDev", "AI-ML", "Algorithms"],
)

# File Uploader for PDF Resumes
uploaded_file = st.file_uploader("Upload the resume here", type="pdf")

# Resume Processing and Scoring
text = ""
summarised=""
if uploaded_file is not None:
    # Read PDF content
    reader = PdfReader(uploaded_file)
    for page in reader.pages:
        text += page.extract_text()

    # Create prompt messages for scoring and summarizing
    prompt_message_score = (
        f"You are a Resume Analyser. Analyze the following resume text: {text}. "
        f"Provide a score between 0-100 based on relevancy for an {vacancy} post requiring {skills} . "
        "Consider marks percentage, college ranking, experience, extracurriculars, positions of responsibility, etc. "
        "Give a very very strict score with no additional text (not even a single alphabet)."
    )

    prompt_message_summary = (
        f"You are a Resume Analyser. Analyze the following resume text: {text}. "
        "Provide the summary for the resume as "
        "Consider marks percentage, college ranking, experience, extracurriculars, positions of responsibility, etc."
    )

    # API Call for Resume Score
    completion = client.chat.completions.create(
        model="llama-3.1-70b-versatile",
        messages=[{"role": "user", "content": prompt_message_score}],
        temperature=1,
        max_tokens=1024,
        top_p=1,
        stream=True,
        stop=None,
    )

    # Collect and Display the ATS Score
    ATS_score = "".join(chunk.choices[0].delta.content or "" for chunk in completion)

    # API Call for Resume Summary
    completion_summary = client.chat.completions.create(
        model="llama-3.1-70b-versatile",
        messages=[{"role": "user", "content": prompt_message_summary}],
        temperature=1,
        max_tokens=1024,
        top_p=1,
        stream=True,
        stop=None,
    )

    # Collect and Display the Summary
    summarised = "".join(chunk.choices[0].delta.content or "" for chunk in completion_summary)

    # st.write(f"ATS Score: {ATS_score}")
    # st.write(f"Resume Summary: {summarised}")

# Initial Conversation History Setup
conversation_history = [
    {"role": "system", "content": (
        f"You are Rahul, a male officer from the Defence Research & Development Organisation (DRDO), responsible for "
        f"conducting a professional interview (High level Interview) for a job vacancy for {vacancy}. Your objective is to "
        f"thoroughly assess the candidate's technical skills specifically {skills}, problem-solving abilities, and cultural "
        f"fit for DRDO. The interview should be structured to include a mix of technical, psychological questions, along with "
        f"appropriate follow-up questions from the resume {summarised}. Throughout the interview, maintain a formal and "
        f"professional tone. If the candidate provides irrelevant responses, politely but firmly redirect them to focus on the "
        f"interview questions. Note: Try to limit the length of questions to 30-50 words. If the candidate continues to provide "
        f"irrelevant answers or engages in unproductive behaviour, calmly inform them that the interview cannot proceed without "
        f"serious engagement, and if necessary, end the interview by stating that the session will be concluded due to a lack of "
        f"relevant responses. Ensure that each question is asked clearly and concisely, and avoid overwhelming the candidate by "
        f"limiting the number of questions asked at once. At the conclusion of the interview, you need to evaluate the candidate's "
        f"overall performance."
    )}
]

# Function to Generate the Interview Summary in JSON Format
def final_dashboard_json(client, conversation_history):
    prompt = """Please provide a summary of the interview using the following JSON format:

    {
        "BasicDetails": {
            "Name of Candidate": "",
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
    Scores(Very Very Strict Marking considering all responses recorded during interview conversation):

    EducationalBackgroundScore: Score based on the candidate's educational qualifications.(Out of 10)
    Experience: Score based on the candidate's relevant work experience.(Out of 10)
    InterpersonalCommunication: Score based on the candidate's ability to communicate and interact effectively.(Out of 10)
    TechnicalKnowledge: Score based on the candidate's technical skills and knowledge.(Out of 10)
    OverallScore: Overall performance score of the candidate.(Try to be less than 50 for bad candidate and 60-70 at max Out of 100)

    InterviewSummary:

    PositivePoints: Key strengths or positive aspects observed during the interview.
    NegativePoints: Key weaknesses or areas of concern noted during the interview.Give 2-3 negative points in ordered format.
    Please ensure the output is strictly in the JSON format provided and reflects a professional evaluation of the interview. Avoid including any speculative or non-factual information.
    """
    
    conversation_history.append({"role": "user", "content": prompt})

    try:
        chat_completion = client.chat.completions.create(
            messages=conversation_history,
            model="llama3-8b-8192",
        )
        response_text = chat_completion.choices[0].message.content
        return response_text
    except Exception as e:
        st.error(f"An error occurred: {e}")
        return None

# Function to Get Response from the API
def get_response(user_input):
    conversation_history.append({"role": "user", "content": user_input})

    try:
        chat_completion = client.chat.completions.create(
            messages=conversation_history,
            model="llama-3.1-70b-versatile",
        )
        response_text = chat_completion.choices[0].message.content
        conversation_history.append({"role": "assistant", "content": response_text})
        return response_text
    except Exception as e:
        st.error(f"An error occurred: {e}")
        return None

# User Input and Conversation Handling
user_input = st.text_input("Type here !!")

if user_input:
    response = get_response(user_input)
    if response:
        for message in conversation_history:
            if message['role'] != 'system':
                role = message['role']
                content = message['content']
                st.write(f"**{role.capitalize()}:** {content}")

# End the Interview and Generate Summary
if st.button("End the Interview"):
    interview_summary = final_dashboard_json(client, conversation_history)
    if interview_summary:
        st.write(interview_summary)
