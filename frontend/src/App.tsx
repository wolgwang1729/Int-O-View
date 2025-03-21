import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

function App() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [spokenText, setSpokenText] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [cameraHeight, setCameraHeight] = useState(300); // Initial camera block height
  const [isCameraOn, setIsCameraOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const cameraAreaRef = useRef<HTMLDivElement>(null);
  const recogRef: any = useRef(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Speech won't work!");
    }

    const recognition = new window.webkitSpeechRecognition();
    recogRef.current = recognition;

    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (e: any) => {
      setTranscript(e.results[0][0].transcript);
    };

    recognition.onspeechend = () => {
      setIsListening(false);
      recognition.stop();
    };

    recognition.onerror = (e: any) => {
      console.error('Speech recognition error detected: ' + e.error);
      setIsListening(false);
      recognition.stop();
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

  const speakText = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(response);
      utterance.rate = 2;

      utterance.onstart = () => {
        setSpokenText('');
      };

      utterance.onboundary = (event) => {
        console.log(event);
        const spokenSoFar = response.substring(0, event.charIndex + 1);
        setSpokenText(spokenSoFar);
      };

      utterance.onend = () => {
        setSpokenText(response);
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  const getresponse = async () => {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/callModel`, { query: transcript });
    setResponse(res.data.message);
  };

  useEffect(() => {
    if (transcript) {
      getresponse();
    }
  }, [transcript]);

  useEffect(() => {
    if (response) {
      speakText();
    }
  }, [response]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMouseDown = () => {
    document.addEventListener('mousemove', handleMouseMove as EventListener);
    document.addEventListener('mouseup', handleMouseUp as EventListener);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (sidebarRef.current) {
      const newWidth = e.clientX;
      if (newWidth > 100 && newWidth < 500) {
        setSidebarWidth(newWidth);
      }
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove as EventListener);
    document.removeEventListener('mouseup', handleMouseUp as EventListener);
  };

  const toggleCamera = async () => {
    if (isCameraOn) {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
      setIsCameraOn(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsCameraOn(true);
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    }
  };

  const handleCameraResizeMouseDown = () => {
    document.addEventListener('mousemove', handleCameraResizeMouseMove as EventListener);
    document.addEventListener('mouseup', handleCameraResizeMouseUp as EventListener);
  };

  const handleCameraResizeMouseMove = (e: MouseEvent) => {
    const newHeight = e.clientY - (cameraAreaRef.current?.getBoundingClientRect().top || 0);
    if (newHeight > 150 && newHeight < 500) {
      setCameraHeight(newHeight);
    }
  };

  const handleCameraResizeMouseUp = () => {
    document.removeEventListener('mousemove', handleCameraResizeMouseMove as EventListener);
    document.removeEventListener('mouseup', handleCameraResizeMouseUp as EventListener);
  };

  return (
    <div className="flex w-full h-screen text-white bg-black">
      {isSidebarOpen && (
        <div
          ref={sidebarRef}
          className="relative bg-gray-800"
          style={{ width: sidebarWidth }}
        >
          <button onClick={toggleSidebar} className="absolute p-2 text-white top-2 right-2">
            &times;
          </button>
          <div className="p-4">
            <p>Sidebar content goes here.</p>
          </div>
          <div
            onMouseDown={handleMouseDown}
            className="absolute top-0 right-0 w-2 h-full bg-gray-600 cursor-col-resize"
          ></div>
        </div>
      )}

      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed z-10 p-2 text-white bg-gray-800 rounded top-2 left-2"
        >
          &#9776; {/* Hamburger icon */}
        </button>
      )}

      <div className="flex flex-col flex-1">
        {/* Camera Area */}
        <div ref={cameraAreaRef} className="relative p-4 bg-gray-900" style={{ height: cameraHeight }}>
          <video ref={videoRef} autoPlay className="w-full h-full bg-gray-900"></video>
          <button
            onClick={toggleCamera}
            className={`absolute bottom-2 left-2 p-2 rounded-full ${isCameraOn ? 'bg-red-600' : 'bg-green-600'}`}
          >
            {isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
          </button>
          <div
            onMouseDown={handleCameraResizeMouseDown}
            className="absolute bottom-0 w-full h-2 bg-gray-600 cursor-row-resize"
          ></div>
        </div>

        {/* Listening and Response Section */}
        <div className="flex-1 p-4 bg-gray-800">
          <button
            onClick={startListening}
            className={`border-2 rounded p-2 ${isListening ? 'border-green-600' : 'border-red-600'}`}
          >
            {isListening ? 'Listening...' : 'Start Listening'}
          </button>
          <p>{transcript}</p>
          <br />
          <p>{spokenText}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
