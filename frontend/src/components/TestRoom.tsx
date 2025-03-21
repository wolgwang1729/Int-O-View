import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { IconRiCameraLine } from "./IconRiCameraLine";
import { IconRiCameraOffLine } from "./IconRiCameraOffline.tsx";
import { IconRiMicLine } from "./IconRiMicLine";
import { IconRiMicOffLine } from "./IconRiMicOffline.tsx";
// import { TextToSpeech } from "elevenlabs-node";
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const recogRef: any = useRef(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!('webkitSpeechRecognition' in window)) {
  //     alert("Speech recognition not supported.");
  //     return;
  //   }

  //   const recognition = new window.webkitSpeechRecognition();
  //   recogRef.current = recognition;

  //   recognition.lang = 'en-US';
  //   recognition.interimResults = false;
  //   recognition.maxAlternatives = 1;

  //   recognition.onresult = (e: any) => {
  //     const transcriptResult = e.results[0][0].transcript;
  //     setTranscript(transcriptResult);
  //   };

  //   recognition.onspeechend = () => {
  //     setIsListening(false);
  //     recognition.stop();
  //   };

  //   recognition.onerror = () => {
  //     setIsListening(false);
  //     recognition.stop();
  //   };
  // }, []);

  // useEffect(() => {
  //   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  //   if (!SpeechRecognition) {
  //     alert("Speech recognition not supported in this browser.");
  //     return;
  //   }

  //   const recognition = new SpeechRecognition(); // Use SpeechRecognition here
  //   recogRef.current = recognition;

  //   recognition.lang = 'en-US';
  //   recognition.interimResults = false;
  //   recognition.maxAlternatives = 1;

  //   recognition.onstart = () => {
  //     console.log("Recognition started");
  //   };

  //   recognition.onresult = (e:any) => {
  //     const transcriptResult = e.results[0][0].transcript;
  //     console.log("Transcript: ", transcriptResult);
  //     setTranscript(transcriptResult);
  //   };

  //   recognition.onspeechend = () => {
  //     console.log("Speech ended");
  //     setIsListening(false);
  //     recognition.stop();
  //   };

  //   recognition.onerror = (e:any) => {
  //     console.error("Error during recognition: ", e.error);
  //     setIsListening(false);
  //     recognition.stop();
  //   };

  //   recognition.onend = () => {
  //     console.log("Recognition stopped");
  //   };
  // }, []);

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
    if (isListening) {
      setIsListening(false);
      recogRef.current.stop();
    } else {
      setIsListening(true);
      recogRef.current.start();
    }
  };

  const handleEndInterview = async () => {
    try {
      // Send the `exit` query via a POST request
      await axios.post("http://localhost:3000/api/v1/user/callModel", {
        query: "exit",
      });

      // After the API call, navigate to the dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error ending interview:", error);
      // Handle error as needed (e.g., show an error message)
    }
  };

  let currentAudio: HTMLAudioElement | null = null;

  const speakText = async (newResponse: string) => {
    if (newResponse) {
      console.log("great");
      try {
        console.log(newResponse);
        const apiKey = "sk_733ba366b5f566c3097fa2a4866d96fe0bb2952845fd4abb";
        const url =
          "https://api.elevenlabs.io/v1/text-to-speech/H6QPv2pQZDcGqLwDTIJQ";

        const options = {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": apiKey,
          },
          body: JSON.stringify({
            text: newResponse,
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.5,
            },
          }),
        };

        const res = await fetch(url, options);

        if (!res.ok) {
          throw new Error("Failed to fetch the audio");
        }

        // Stop the previous audio if it is still playing
        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0; // Reset the audio
        }

        const audioUrl = URL.createObjectURL(await res.blob());

        // Create new audio and assign it to currentAudio
        currentAudio = new Audio(audioUrl);
        currentAudio.play();

        setIsGifVisible(true);
        currentAudio.onended = () => {
          setIsGifVisible(false);
          currentAudio = null; // Clear the reference when done
        };
      } catch (error) {
        console.error("Error speaking text:", error);
      }
    }
  };

  useEffect(() => {
    speakText(response);
  }, [response]);


  const getResponse = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/callModel",
        { query: transcript }
      );

      if(transcript === "exit") {
        handleEndInterview();
      }


      const newResponse = res.data.message;
      setResponse(newResponse);
      setConversationHistory([
        ...conversationHistory,
        { user: transcript, ai: newResponse },
      ]);
      // speakText();
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  useEffect(() => {
    if (transcript) {
      getResponse();
    }
  }, [transcript]);

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
    <div className="flex flex-col min-h-screen font-sans text-gray-200 bg-zinc-900">
      <div className="flex justify-between p-4 bg-zinc-800">
        <h2 className="text-2xl font-semibold">
          <img src="logo2_cropped.jpg" alt="logo" className="h-12 rounded-md" />
        </h2>
        <button
          onClick={handleEndInterview}
          className="px-4 py-2 font-mono font-bold text-black bg-white rounded-md"
        >
          End Interview
        </button>
      </div>

      <div className="flex flex-1 gap-4 p-4 overflow-hidden">
        {/* Left Section with Camera and GIF */}
        <div className="flex flex-col items-center flex-1 gap-4">
          <div className="flex flex-row justify-center w-full gap-4">
            {/* Camera Area */}
            <div className="relative w-1/2 max-w-sm overflow-hidden bg-gray-800 h-72 rounded-3xl">
              <video
                ref={videoRef}
                autoPlay
                className={`w-full h-full ${isCameraOn ? "block" : "hidden"}`}
              ></video>
              {!isCameraOn && (
                <div className="flex items-center justify-center h-full text-3xl text-white">
                  User
                </div>
              )}
            </div>

            {/* GIF Area */}
            <div className="relative items-center justify-center w-1/2 max-w-sm overflow-hidden bg-black h-72 rounded-3xl">
              {isGifVisible && !isListening ? (
                <img
                  src="interview_room.gif"
                  alt="Interviewer"
                  className="object-cover h-full w-fit"
                />
              ) : (
                <img
                  src="interview_room_1_crop.jpg"
                  alt="Interviewer"
                  className="object-cover w-full h-full"
                />
              )}
            </div>
          </div>

          {/* Camera and Mic Icons */}
          <div className="flex justify-center p-2 rounded-3xl">
            <button
              onClick={toggleCamera}
              className={`items-center justify-center p-4 mr-4 rounded-full ${
                isCameraOn ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {isCameraOn ? (
                <IconRiCameraLine className="text-3xl" />
              ) : (
                <IconRiCameraOffLine className="text-3xl" />
              )}
            </button>

            <button
              onClick={startListening}
              className={`items-center justify-center p-4 rounded-full ${
                isListening ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {isListening ? (
                <IconRiMicLine className="text-3xl" />
              ) : (
                <IconRiMicOffLine className="text-3xl" />
              )}
            </button>
          </div>

          {/* Message and Response Section */}
          <div className="w-full min-h-0 p-4 rounded-md bg-zinc-800">
            {transcript && (
              <p className="p-4 mt-2 text-lg rounded-md">
                <span className="font-semibold">User:</span> <br /> {transcript}
              </p>
            )}
            {response && (
              <p className="p-4 mt-2 text-lg rounded-md">
                <span className="font-semibold">AI Response:</span> <br />{" "}
                {response}
              </p>
            )}
          </div>
        </div>

        {/* Right Section with Conversation History */}
        <div className="flex flex-col flex-1 p-4 bg-zinc-800 rounded-3xl max-w-[500px]">
          <h3 className="text-2xl font-semibold">Past Conversations</h3>
          <div className="flex flex-col p-4 mt-2 space-y-4 overflow-y-auto min-h-[560px] max-h-[560px] rounded-2xl bg-zinc-00">
            {conversationHistory.map((conv, index) => (
              <div key={index} className="pb-2 border-b border-gray-600">
                <CollapsibleMessage message={conv.user} isUser />
                <CollapsibleMessage message={conv.ai} />
              </div>
            ))}
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
    <p className="cursor-pointer" onClick={toggleExpand}>
      <span className="font-semibold">{isUser ? "User:" : "AI Response:"}</span>{" "}
      {isExpanded || message.length <= MAX_LENGTH ? (
        <span>{message}</span>
      ) : (
        <span>
          {message.substring(0, MAX_LENGTH)}...{" "}
          <button className="text-blue-500">Expand</button>
        </span>
      )}
    </p>
  );
}

export default TestRoom;
