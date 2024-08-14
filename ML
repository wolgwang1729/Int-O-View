
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
