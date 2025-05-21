import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { IconRiCameraLine } from "./IconRiCameraLine";
import { IconRiCameraOffLine } from "./IconRiCameraOffline.tsx";
import { IconRiMicLine } from "./IconRiMicLine";
import { IconRiMicOffLine } from "./IconRiMicOffline.tsx";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

function TestRoom() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [conversationHistory, setConversationHistory] = useState<any[]>([]);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isGifVisible, setIsGifVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isEndingInterview, setIsEndingInterview] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const recogRef: any = useRef(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recogRef.current = recognition;

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log("Recognition started");
    };

    recognition.onresult = (e: any) => {
      const transcriptResult = e.results[0][0].transcript;
      console.log("Transcript: ", transcriptResult);
      setTranscript(transcriptResult);
    };

    recognition.onspeechend = () => {
      console.log("Speech ended");
      setIsListening(false);
      recognition.stop();
    };

    recognition.onerror = (e: any) => {
      console.error("Error during recognition: ", e.error);
      setIsListening(false);
      recognition.stop();
    };

    recognition.onend = () => {
      console.log("Recognition stopped");
    };
  }, []);

  const startListening = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
      setIsGifVisible(false); 
    }
    
    if (isListening) {
      setIsListening(false);
      recogRef.current.stop();
    } else {
      setIsListening(true);
      setTranscript("");
      recogRef.current.start();
    }
  };

  const handleEndInterview = async () => {
    try {
      setIsEndingInterview(true);
      
      // Stop any playing audio
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current.currentTime = 0;
        currentAudioRef.current = null;
        setIsGifVisible(false); 
      }
      
      // Send the `exit` query via a POST request
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/callModel`, {
        query: "exit",
      });

      // After the API call, navigate to the dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error ending interview:", error);
      setIsEndingInterview(false); // Reset loading state if there's an error
      // Handle error as needed (e.g., show an error message)
    }
  };

  const speakText = async (newResponse: string) => {
    if (newResponse) {
      try {
        console.log(newResponse);
        const apiKey = `${import.meta.env.VITE_ELEVEN_LAB_KEY}`;
        const url = 'https://api.elevenlabs.io/v1/text-to-speech/MF4J4IDTRo0AxOO4dpFR';
  
        const options = {
          method: 'POST',
          mode: "cors" as RequestMode,
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': apiKey,
          },
          body: JSON.stringify({
            text: newResponse,
            model_id :"eleven_flash_v2_5",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.5,
            },
          }),
        };
  
        const res = await fetch(url, options);
  
        if (!res.ok) {
          throw new Error('Failed to fetch the audio');
        }
  
        // Stop the previous audio if it is still playing
        if (currentAudioRef.current) {
          currentAudioRef.current.pause();
          currentAudioRef.current.currentTime = 0; // Reset the audio
        }
  
        const audioUrl = URL.createObjectURL(await res.blob());
  
        // Create new audio and assign it to currentAudio
        currentAudioRef.current = new Audio(audioUrl);
        currentAudioRef.current.play();
  
        setIsGifVisible(true);
        currentAudioRef.current.onended = () => {
          setIsGifVisible(false);
          currentAudioRef.current = null; // Clear the reference when done
        };
  
      } catch (error) {
        console.error('Error speaking text:', error);
      }
    }
  };
  

  useEffect(() => {
    speakText(response);
  }, [response]);

  const getResponse = async () => {
    try {
      setIsProcessing(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/callModel`,
        { query: transcript }
      );

      if (transcript === "exit") {
        handleEndInterview();
      }

      const newResponse = res.data.message;
      const trimmed = newResponse?.trimStart() ?? "";
      if (trimmed.startsWith("```json") || trimmed.startsWith("{")) {
        handleEndInterview();
      }
      setResponse(newResponse);
      setConversationHistory([
        ...conversationHistory,
        { user: transcript, ai: newResponse },
      ]);
      setIsProcessing(false);
    } catch (error) {
      console.error("Error fetching response:", error);
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (transcript) {
      getResponse();
    }
  }, [transcript]);

  useEffect(() => {
    // Auto-scroll to the bottom of conversation history when new messages arrive
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [conversationHistory]);

  const toggleCamera = async () => {
    if (isCameraOn) {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
      setIsCameraOn(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsCameraOn(true);
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-200 bg-gradient-to-b from-zinc-900 to-zinc-800">
      {/* More compact header */}
      <header className="flex items-center justify-between px-4 py-2 bg-zinc-800 shadow-md">
        <div className="flex items-center gap-2">
          <img src="logo2_cropped.jpg" alt="logo" className="h-8 rounded-md shadow-lg" />
        </div>
        <button
          onClick={handleEndInterview}
          disabled={isEndingInterview}
          className={`px-4 py-1 font-mono font-bold text-red-600 transition-all duration-300 bg-white rounded-full shadow-lg hover:bg-red-100 hover:scale-105 active:scale-95 text-sm ${isEndingInterview ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {isEndingInterview ? (
            <div className="flex items-center justify-center">
              <span className="mr-2">Ending</span>
              <div className="inline-block w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            'End Interview'
          )}
        </button>
      </header>

      <div className="flex flex-1 gap-4 p-3 overflow-hidden">
        {/* Left Section with Camera and GIF - reduced height */}
        <div className="flex flex-col items-center flex-1 gap-2 p-1">
          <div className="flex flex-row justify-center w-full gap-4">
            {/* Camera Area - reduced height */}
            <div className="relative w-1/2 max-w-sm overflow-hidden bg-gray-800 shadow-xl h-56 rounded-xl">
              <div className="absolute top-0 left-0 z-10 p-1 m-1 text-xs font-medium bg-black bg-opacity-50 rounded-lg">
                {isCameraOn ? "Camera Active" : "Camera Off"}
              </div>
              <video
                ref={videoRef}
                autoPlay
                className={`w-full h-full object-cover ${isCameraOn ? "block" : "hidden"}`}
              ></video>
              {!isCameraOn && (
                <div className="flex items-center justify-center h-full text-xl text-gray-400">
                  <div className="p-2 text-center">
                    <div className="w-16 h-16 mx-auto mb-1 rounded-full bg-zinc-700 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <p className="text-sm">Camera disabled</p>
                  </div>
                </div>
              )}
            </div>

            {/* GIF Area - fixed centering */}
            <div className="relative w-1/2 max-w-sm overflow-hidden bg-black shadow-xl h-56 rounded-xl flex items-center justify-center">
              <div className="absolute top-0 left-0 z-10 p-1 m-1 text-xs font-medium bg-black bg-opacity-50 rounded-lg">
                Interviewer
              </div>
              {isGifVisible && !isListening ? (
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src="interview_room.gif"
                    alt="Interviewer"
                    className="object-contain max-h-full max-w-full"
                  />
                </div>
              ) : (
                <img
                  src="staticgif.jpg"
                  alt="Interviewer"
                  className="object-cover w-full h-full"
                />
              )}
            </div>
          </div>

          {/* Camera and Mic Icons - more compact */}
          <div className="flex justify-center p-1 bg-zinc-800 bg-opacity-50 rounded-xl shadow-inner">
            <button
              onClick={toggleCamera}
              className={`flex items-center justify-center p-3 mr-5 transition-all duration-300 transform rounded-full ${
                isCameraOn 
                ? "bg-gradient-to-br from-green-500 to-green-700 hover:from-green-600 hover:to-green-800" 
                : "bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800"
              } shadow-lg hover:scale-105 active:scale-95`}
            >
              {isCameraOn ? (
                <IconRiCameraLine className="text-2xl text-white" />
              ) : (
                <IconRiCameraOffLine className="text-2xl text-white" />
              )}
            </button>

            <button
              onClick={startListening}
              className={`flex items-center justify-center p-3 transition-all duration-300 transform rounded-full ${
                isListening 
                ? "bg-gradient-to-br from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 animate-pulse" 
                : "bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800"
              } shadow-lg hover:scale-105 active:scale-95`}
            >
              {isListening ? (
                <IconRiMicLine className="text-2xl text-white" />
              ) : (
                <IconRiMicOffLine className="text-2xl text-white" />
              )}
            </button>
          </div>

          {/* Message and Response Section - will now be more visible without scrolling */}
          <div className="w-full flex-1 min-h-[280px] p-4 overflow-y-auto shadow-xl rounded-xl bg-zinc-800 bg-opacity-70 backdrop-blur-sm">
            <h3 className="mb-2 text-lg font-medium border-b border-zinc-700 pb-1">Current Conversation</h3>
            <div className="overflow-y-auto max-h-[240px] pr-1">
              {isListening && (
                <div className="p-2 mb-3 text-green-400 bg-zinc-700 rounded-lg animate-pulse text-sm">
                  Listening... Speak now
                </div>
              )}
              
              {isProcessing && (
                <div className="flex items-center p-2 mb-3 space-x-2 text-blue-400 bg-zinc-700 rounded-lg text-sm">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                  <span className="ml-1">Processing response...</span>
                </div>
              )}
              
              {transcript && (
                <div className="p-3 mb-3 transition-all duration-300 rounded-lg bg-zinc-700 hover:bg-zinc-600">
                  <p className="mb-1 font-semibold text-blue-300 text-sm">You</p>
                  <p className="text-base">{transcript}</p>
                </div>
              )}
              
              {response && (
                <div className="p-3 transition-all duration-300 rounded-lg bg-zinc-700 hover:bg-zinc-600">
                  <p className="mb-1 font-semibold text-green-300 text-sm">Interviewer</p>
                  <p className="text-base">{response}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Section with Conversation History - adjusted height */}
        <div className="flex flex-col flex-1 p-3 shadow-xl bg-zinc-800 rounded-xl max-w-[450px] bg-opacity-70 backdrop-blur-sm max-h-[calc(94vh-2rem)]">
          <h3 className="mb-2 text-lg font-semibold text-white">Conversation History</h3>
          <div 
            ref={historyRef}
            className="flex flex-col p-3 space-y-3 overflow-y-auto flex-1 rounded-xl bg-zinc-700 bg-opacity-50 shadow-inner"
            style={{ maxHeight: 'calc(100vh - 2rem)' }}
          >
            {conversationHistory.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                <p>No conversation history yet</p>
              </div>
            ) : (
              conversationHistory.map((conv, index) => (
                <div key={index} className="pb-2 border-b border-gray-600 last:border-0">
                  <div className="mb-2 transition-all duration-200 hover:bg-zinc-600 p-2 rounded-lg bg-zinc-700">
                    <CollapsibleMessage message={conv.user} isUser />
                  </div>
                  <div className="transition-all duration-200 hover:bg-zinc-600 p-2 rounded-lg bg-zinc-700">
                    <CollapsibleMessage message={conv.ai} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CollapsibleMessage({
  message,
  isUser,
}: {
  message: string;
  isUser?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 40; // Maximum length before collapsing

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="cursor-pointer" onClick={toggleExpand}>
      <p className={`font-semibold ${isUser ? "text-blue-300" : "text-green-300"} mb-1 text-xs`}>
        {isUser ? "You:" : "Interviewer:"}
      </p>
      
      {isExpanded || message.length <= MAX_LENGTH ? (
        <p className="text-sm">{message}</p>
      ) : (
        <div className="text-sm">
          <span>{message.substring(0, MAX_LENGTH)}... </span>
          <button className="px-1 py-0.5 ml-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600">
            Read more
          </button>
        </div>
      )}
    </div>
  );
}

export default TestRoom;
