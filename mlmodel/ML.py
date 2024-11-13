
import streamlit as st
from groq import Groq

client = Groq(api_key="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")

st.title("Interview Arena")

vacancy = st.selectbox(
    "For which post are you applying?",
    ("SDE", "ML-Scientist", "Junior Research Fellow"),
)

skills = st.multiselect(
    "Select the skills",
    ["CP", "WebDev", "AI-ML", "Algorithms"],
)

conversation_history = [
    {"role": "system", "content": "xyz"},
]

conversation_history = [
    {"role": "system", "content": f"You are Rahul, a male officer from the Defence Research & Development Organisation (DRDO), responsible for conducting a professional interview (High level Interview) for a job vacancy for {vacancy}. Your objective is to thoroughly assess the candidate's technical skills specifically {skills}, problem-solving abilities, and cultural fit Innovation and Creativity, Teamwork and Collaboration , Decision Making  for DRDO. The interview should be structured to include a mix of technical , psychological questions, along with appropriate follow-up questions to probe deeper into the candidate's knowledge. Throughout the interview, maintain a formal and professional tone. If the candidate provides irrelevant responses (e.g., answering simple arithmetic questions like '2+5'), politely but firmly redirect them to focus on the interview questions. Note : Even try to limit the length of questions to be 30-50 words .If the candidate continues to provide irrelevant answers or engages in unproductive behaviour, calmly inform them that the interview cannot proceed without serious engagement, and if necessary, end the interview by stating that the session will be concluded due to a lack of relevant responses. Ensure that each question is asked clearly and concisely, and avoid overwhelming the candidate by limiting the number of questions asked at once. At the conclusion of the interview, you need to evaluate the candidate's overall performance. When I say end the interview , you need to enter the interview , be strict and try to note which questions are not able to be answered by the interviewee.You are not entering into the real world simulation.Try not to make up things , please clear and concise.Don't ever add Please note that this is a formal and professional interview, and I expect your responses to be relevant and concise. If you have any questions or concerns, please feel free to ask.in answer response.Start by taking introduction and then to make skill related questions and counter questions."},
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
    conversation_history.append({"role": "Final Verdict Giver ", "content": prompt})
    chat_completion = client.chat.completions.create(
                messages=conversation_history,
                model="llama3-8b-8192",
            )
    response_text = chat_completion.choices[0].message.content
    return response_text

def get_response(user_input):
    conversation_history.append({"role": "user", "content": user_input})

    chat_completion = client.chat.completions.create(
            messages=conversation_history,
            model="llama3-8b-8192",
        )
    response_text = chat_completion.choices[0].message.content
    conversation_history.append({"role": "assistant", "content": response_text})
    return response_text

user_input = st.text_input("Type here !!")

if user_input:
    get_response(user_input)
    for message in conversation_history:
        if message['role'] != 'system':
            role = message['role']
            content = message['content']
            st.write(f"**{role.capitalize()}:** {content}")

if st.button("End the Interview"):
    st.json(final_dashboard_json())
=======

import streamlit as st
import sounddevice as sd
import numpy as np
import speech_recognition as sr
import scipy.io.wavfile as wav
from gtts import gTTS
import os
import cv2
from groq import Groq

# Replace with your actual API key
client = Groq(api_key="APIKEY")

st.title("Interview Arena")
st.write("Start your interview by saying 'Let's Start!!'")

# Initialize the session state to store the conversation history
if "messages" not in st.session_state:
    st.session_state.messages = [
        {"role": "system", "content": "You are an interviewer and need to interview for an SDE role in your company. Ask questions and counter questions, and at the end, when I say 'show me result', show whether I am recruited or not. Also, don't add notes, recommendations, or suggestions in the answer. Make it a real interview. Please respond as you would in a real interview."}
    ]

# Function to record audio using sounddevice
def record_audio(duration=20, fs=44100):
    st.write("Recording...")
    recording = sd.rec(int(duration * fs), samplerate=fs, channels=1, dtype='int16')
    sd.wait()  # Wait until recording is finished
    return np.squeeze(recording)

# Function to save the audio file in WAV format for speech recognition
def save_wav(filename, data, fs):
    wav.write(filename, fs, data)

# Function to transcribe audio using Google's Web Speech API
def transcribe_audio(filename):
    recognizer = sr.Recognizer()
    with sr.AudioFile(filename) as source:
        audio = recognizer.record(source)
    try:
        return recognizer.recognize_google(audio)
    except sr.UnknownValueError:
        st.write("Google Speech Recognition could not understand audio")
        return ""
    except sr.RequestError as e:
        st.write(f"Could not request results from Google Speech Recognition service; {e}")
        return ""

# Function to convert text to speech
def text_to_speech(text, filename="response.mp3"):
    tts = gTTS(text, lang='en')
    tts.save(filename)
    return filename

# Button to start recording
if st.button("Start Recording"):
    duration = 5  # Record for 5 seconds
    fs = 44100  # Sampling rate
    audio_data = record_audio(duration=duration, fs=fs)
    filename = "temp_audio.wav"
    save_wav(filename, audio_data, fs)

    # Transcribe the saved audio file
    content = transcribe_audio(filename)

    if content:
        # Add the user's input to the conversation history
        st.session_state.messages.append({"role": "user", "content": content})

        # Get the model's response
        chat_completion = client.chat.completions.create(
            messages=st.session_state.messages,
            model="llama3-8b-8192",
        )

        response_text = chat_completion.choices[0].message.content
        st.session_state.messages.append({"role": "assistant", "content": response_text})

        # Display the conversation
        for msg in st.session_state.messages:
            if msg["role"] != "system":
                st.write(f"{msg['role'].capitalize()}: {msg['content']}")

        # Convert the model's response to speech
        audio_file = text_to_speech(response_text)

        # Play the audio file
        st.audio(audio_file)

        # Optionally, remove the temporary audio file after use
        os.remove(audio_file)
