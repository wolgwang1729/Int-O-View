import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

declare global{
  interface Window{
    webkitSpeechRecognition : any
  }
}


function App() {

  const [isListening , setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  const [spokenText, setSpokenText] = useState("")
  const recogRef : any = useRef(null)

  //recording the stuff
  useEffect(()=>{

    if (!("webkitSpeechRecognition" in window)){
      alert("speech won't work !")
    }


    const recognition = new window.webkitSpeechRecognition()
    recogRef.current = recognition

    recognition.lang = "en-US"
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onresult = (e : any)=>{
      setTranscript(e.results[0][0].transcript)
    }

    recognition.onspeechend = ()=>{
      setIsListening(false)
      recognition.stop()
    }

    recognition.onerror = (e : any) => {
      console.error("Speech recognition error detected: " + e.error);
      setIsListening(false)
      recognition.stop()
    };

  },[])

  const startListening = ()=>{
    if (isListening){
      setIsListening(false)
      recogRef.current.stop()
    }else{
      setIsListening(true)
      recogRef.current.start()
    }
  }

  const speakText = () => {

    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(response);
      utterance.rate = 2

      utterance.onstart = () => {
        setSpokenText('')
      };

      utterance.onboundary = (event) => {
          console.log(event)
          const spokenSoFar = response.substring(0, (event.charIndex)+1);
          setSpokenText(spokenSoFar)
      };
      
      utterance.onend = () => {
        setSpokenText(response)
      };


      window.speechSynthesis.speak(utterance);
    }
  };

  const getresponse = async()=>{
    const res = await axios.post('http://localhost:3000/api/v1/user/callModel',{query : transcript})
    setResponse(res.data.message)
  }

  useEffect(()=>{
    if (transcript){
      getresponse()
    }
  },[transcript])

  useEffect(()=>{
    if (response){
      speakText()
    }
  },[response])

  return (
    <div className='w-full h-screen bg-black text-white'>
      <button onClick={startListening} className={`border-2 rounded p-2 ${isListening ? 'border-green-600' : 'border-red-600'}`}>
        {
          isListening ? 'Listening...':'Start Listening'
        }
      </button>
      <p>{transcript}</p>
      <br />
      <p>{spokenText}</p>
    </div>
  )
}

export default App