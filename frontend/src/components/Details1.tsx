import { useState,ChangeEvent,useEffect,useRef} from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import styled from "styled-components";

import { ArrowRight } from 'lucide-react'

// const OTP=styled.section`
//  --d:11px;
//     width: 2px;
//     height: 2px;
//     border-radius: 50%;
//     color: white;
//     box-shadow: 
//       calc(1*var(--d))      calc(0*var(--d))     0 0,
//       calc(0.707*var(--d))  calc(0.707*var(--d)) 0 0.5px,
//       calc(0*var(--d))      calc(1*var(--d))     0 1px,
//       calc(-0.707*var(--d)) calc(0.707*var(--d)) 0 1.5px,
//       calc(-1*var(--d))     calc(0*var(--d))     0 2px,
//       calc(-0.707*var(--d)) calc(-0.707*var(--d))0 2.5px,
//       calc(0*var(--d))      calc(-1*var(--d))    0 3px;
//     animation: l27 1s infinite steps(8);
//   }
//   @keyframes l27 {
//     100% {transform: rotate(1turn)}

// `

export default function Details1() {
  const navigate=useNavigate();
   const [name,setName]=useState<string>('');
  const [email,setEmail]=useState<string>('');
  const [mobile,setMobile]=useState<string>('');
  // const [otp,setOtp]=useState<string>('');


  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [verifying, setVerifying] = useState<boolean>(false)

  const setValue = (e: React.ChangeEvent<HTMLInputElement>, index: number)=>{
      const value=e.target.value;
      if (isNaN(Number(value))){
          return
      }

      const newOtp = [...otp]
      const enteredValue = String(e.target.value)

      newOtp[index] = enteredValue === ""? "" : enteredValue[enteredValue.length-1]
      setOtp(newOtp)

      if (newOtp[index] && index < otp.length - 1) {
        const nextInput = inputRefs.current[index + 1];
        
        if (nextInput) {
          nextInput.focus();
        }
      }
      if (newOtp[index] && index === otp.length - 1) {
        if (buttonRef.current) {
          buttonRef.current.click();
        }
      }
      
  }

  const moveToAnotherBox = (e: React.KeyboardEvent<HTMLInputElement>, index: number)=>{

    if (e.key === "Backspace") {
      if (index > 0 && !otp[index]) {
        const prevInput = inputRefs.current[index - 1];
        
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
    
  }

  const putCursorAtBack = (index: number) => {
    const inputElement = inputRefs.current[index];
    
    if (inputElement) {
      inputElement.setSelectionRange(1, 2);
    }
  };
  
  const handleVerify = () => {
    setVerifying(true);
  
    for (let i = 0; i < otp.length; i++) {
      if (otp[i] === "") {
        setVerifying(false);
        const inputElement = inputRefs.current[i];
        if (inputElement) {
          inputElement.focus();
        }
        return;
      }
    }
    let otpnumber=0;
    console.log(otp);
    otp.map(value=>{
      otpnumber=otpnumber*10+ Number(value);
    })
    console.log(otpnumber);
    axios.post('http://localhost:3000/api/v1/user/verifyOtp',{
      email:email,
      otp:otpnumber.toString()
  })
  .then(function(response){
    if(response.status==200){
      navigate("/details_2");
    }
    else{
      setVerifying(false);
    }
      
  })
  .catch(function(error){
    setVerifying(false);
      console.log(error);
  })

    
  }

    useEffect(() => {
      const firstInput = inputRefs.current[0];
      if (firstInput) {
        firstInput.focus();
      }
    }, []);


  
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.trim());
    console.log(name);
  };
  
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  
  const handleMobileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMobile(e.target.value);
  };
  
  
  
  const isFormValid = (): boolean => {
   
    if(name.trim()===''){
      window.alert("Please enter name");
      return false;
    }
    else if(email.trim()===''){
      window.alert("Please enter email");
      return false;
    }
    else if(mobile.length!=10){
      window.alert("Enter valid mobile number");
      return false;
    }
    
    return true;
  };
  
 
  
  const handleSubmit = (e: React.FormEvent) => {
     console.log("hrllo");
    e.preventDefault();
    if (isFormValid()) {
      // Submit form logic here
      axios.post('http://localhost:3000/api/v1/user/sendOtp',{
        email:email
    })
    .then(function(response){
        console.log(`Otp sent successfully : ${response}`);
    })
    .catch(function(error){
        console.log(error);
    })
      let signup_div=document.getElementById("signup-div");
      signup_div?.classList.add("hidden");
      let otp_div=document.getElementById("otp-div");
      otp_div?.classList.remove("hidden");
      otp_div?.classList.add("flex");
      console.log('Form submitted:');
    }
  };
  
 

  return (
    <section>
      <div id="rest-div" className="grid grid-cols-1 lg:grid-cols-2">
        <div className=" items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <img className='h-[10vw] w-[22vw] -mt-12 ml-8' src='logo1.jpg'/>
<div id="otp-div" className='hidden w-96 h-48 flex-col justify-center items-center gap-8'>
  <div className="mt-[8vw] xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
    <div className="text-lg mt-12 ml-20 font-bold leading-tight text-black sm:text-4xl">
      OTP Verification
    </div>
    <div className="mt-12 ml-20 font-semibold font-mono"> 
      Enter Otp received on email
    </div>
  </div>
        <div className='flex gap-1 ml-12'>
            {
                otp.map((val, index)=>(
                    <input
                    disabled={verifying} 
                    type="text"
                    key={index} 
                    value={val}
                    onChange={(e)=>{setValue(e,index)}}
                    onKeyDown={(e)=>{moveToAnotherBox(e,index)}}
                    onClick={()=>putCursorAtBack(index)}
                    ref={(input)=>inputRefs.current[index] = input}
                    className='h-16 -mt-3 aspect-square border-[2px] rounded-md outline-none px-[1.35rem] text-3xl'
                    />
                ))
            }
        </div>
        <div>
        <button 
            className='bg-cyan-400 ml-12 mt-4 hover:bg-blue-500 text-white rounded-md outline-none focus:bg-cyan-600 w-[21vw] h-10' 
            ref={buttonRef}
            onClick={handleVerify}
            disabled={verifying}
        >
            {
                verifying ? <div className='loader'></div> : <div className='-ml-2 font-bold font-mono text-2xl'>Verify</div>
            }
        </button>
        </div>
    </div>
  
    {/* </OTP> */}


          <div id="signup-div" className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            
            <h2 className="text-xl font-bold leading-tight text-black sm:text-4xl">Get Started!</h2>
            
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="text-base font-medium text-gray-900">
                    {' '}
                    Full Name{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Full Name"
                      id="name"
                      onChange={handleNameChange}
                    ></input>
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="text-base font-medium text-gray-900">
                    {' '}
                    Email address{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      id="email"
                      onChange={handleEmailChange}
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor='number' className="text-base font-medium text-gray-900">
                      {' '}
                      Mobile No.{' '}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="number"
                      placeholder="Mobile Number"
                      id="mobile"
                      onChange={handleMobileChange}
                    ></input>
                  </div>
                </div>
                <div>
                  <button
                  onClick={handleSubmit} id="otp-but"
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Create Account <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
           
          </div>  
        </div>
        <div className="h-screen w-full border-2 ">
          <img
            className="mx-auto h-full w-full rounded-md object-cover"
            src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
            alt=""
          />
          </div>
        </div> 
        
      {/* </div> */}
    </section>
  )
}



// const Input=styled.section`
//     p {
//             margin:20px 20;
//             position:relative;
//             display:inline-block;
//         }

//         label {
//              padding:10px;
//             pointer-events: none;
//             position:absolute;
//             left:0;
//             top:0;
//             transition: 0.2s;
//             transition-timing-function: ease;
//             transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
//             opacity:0.5;
//             background: white;
//         }

//         input {
//           height:100%;
//           width:100%;
//         }

//         input:focus + label, input:not(:placeholder-shown) + label {
//             opacity:1;
//             transform: scale(0.75) translateY(-70%) translateX(-14px);
//         }
        
// `

// const Details=styled.section`
// background:radial-gradient(#cbd5e1 95%,#2563eb );
// `

// function Details1() {
//   // const nameref=useRef(null);
//     const navigate=useNavigate();

// const [name,setName]=useState<string>('');
// const [email,setEmail]=useState<string>('');
// const [mobile,setMobile]=useState<string>('');
// const [otp,setOtp]=useState<string>('');

// const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
//   setName(e.target.value.trim());
//   console.log(name);
// };

// const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
//   setEmail(e.target.value);
// };

// const handleMobileChange = (e: ChangeEvent<HTMLInputElement>) => {
//   setMobile(e.target.value);
// };

// const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setOtp(e.target.value);
//   };

// const isFormValid = (): boolean => {
//   // Check if all fields are filled
//   // return Object.values(formState).every(value => value.trim() !== '');
//   console.log(name);
//   console.log(email);
//   console.log(mobile);
//   // return name.trim() !== '' && email.trim() !== '' && mobile.trim() !== '' &&mobile.length==10 ;
//   if(name.trim()===''){
//     window.alert("Please enter name");
//     return false;
//   }
//   else if(email.trim()===''){
//     window.alert("Please enter email");
//     return false;
//   }
//   else if(mobile.length!=10){
//     window.alert("Enter valid mobile number");
//     return false;
//   }
//   let rest_div=document.getElementById("rest-div");
//   rest_div?.classList.add("blur-sm");
//   rest_div?.addEventListener("click",()=>{
//     closeOtp();
// })
// axios.post('http://localhost:3000/api/v1/user/sendOtp',{
//     email:email
// })
// .then(function(response){
//     console.log(`Otp sent successfully : ${response}`);
// })
// .catch(function(error){
//     console.log(error);
// })

//   return true;
// };

// function closeOtp(){
//     let otp_div1=document.getElementById("otp-div");
//     let rest_div=document.getElementById("rest-div");
//     otp_div1?.classList.add("hidden");
//     rest_div?.classList.remove("blur-sm");

// }

// const handleSubmit = (e: React.FormEvent) => {
// //   console.log("hrllo");
//   e.preventDefault();
//   if (isFormValid()) {
//     // Submit form logic here
//     let sub=document.getElementById("otp-but");
//     sub?.removeAttribute("disabled");
//     let otp_div=document.getElementById("otp-div");
//     otp_div?.classList.remove("hidden");
    
//     console.log('Form submitted:');
//   }
// };

// function verifyOtp(){
//     axios.post('http://localhost:3000/api/v1/user/verifyOtp',{
//         email:email,
//         otp:otp
//     })
//     .then(function(response){
//         console.log(`Otp verified successfully : ${response}`);
//         if(response.status==200){
//             navigate("/details_2")
//         }
//     })
//     .catch(function(error){
//         console.log(error);
//     })

// }



// // className="border-2 rounded-md border-slate-500 border-solid -ml-20 h-8 w-80 mt-2"
// // type="text" autoFocus  name="name" value={name} id="cand-name" placeholder=" " onInput={handleNameChange} required

// // useEffect(()=>{
// //   if(nameref.current){
// //     nameref.current.focus()
// //   }
// // },[])
// // bg-gradient-to- from-blue-500 to-blue-200 to-60%

//   return (
//     <div>
//       <Details>
//         <div id="rest-div" className="h-screen  w-screen ">
//             <div>
//                 <button onClick={()=>navigate("/")}>Home</button>
//             </div>
//             <form onSubmit={handleSubmit} className="p-36 bg-blue- w-[35vw] ml-[32.5vw] h-[38vw] mt-28 rounded-l relative bg-white ">
              
//                 <div id="name_inp" className="ml-3 text-center -mt-32 w-full">
//                   <div className="mb-4 -ml-2 text-center w-full ">
//                     <img src="logo1.jpg"/>
//                     <p className="font-bold mt-5"> Welcome</p>
//                   </div>
//                     {/* <div className="-ml-32 font-bold font-serif text-xl" >Candidate's Name</div> */}
//                     <Input>
//                     <p className="-ml-20 border-2 border-slate-500 rounded-md w-80 h-12">
//                     <input type="text"  autoFocus name="name" value={name} id="cand-name" placeholder=" " onInput={handleNameChange} required                    />
//                     <label>Candidate's Name*</label>
//                     </p>
//                     </Input>
//                 </div>
//                 <div className="ml-3 text-center mt-5 w-full ">
//                 <Input>
//                     <p className="-ml-20 mt-4 border-2 border-slate-500 rounded-md w-80 h-12">
//                     <input type="number" name="mobile" value={mobile} id="cand-mobile" placeholder=" " onInput={handleMobileChange} required                    />
//                     <label>Candidate's Mobile*</label>
//                     </p>
//                     </Input>
//                     {/* <div className="-ml-20 font-bold font-serif text-xl">Candidate's Mobile No.</div>
//                     <input type="number" name="mobile" className="border-2 rounded-md -ml-20 h-8 border-slate-500 border-solid w-80 mt-2"  id="cand-mobile" placeholder="Enter Candidate's Phone No." onInput={handleMobileChange} required/> */}
//                 </div>
//                 <div className="ml-3 text-center mt-5 w-full ">
//                 <Input>
//                     <p className="-ml-20 mt-4 border-2 border-slate-500 rounded-md w-80 h-12">
//                     <input type="email" name="name" value={email} id="cand-email" placeholder=" " onInput={handleEmailChange} required                    />
//                     <label>Candidate's email*</label>
//                     </p>
//                     </Input>
//                     {/* <div className="-ml-32 font-bold font-serif text-xl">Candidate's Email</div>  
//                     <input type="email" className="rounded-md border-2 border-slate-500 -ml-20 h-8 border-solid w-80 mt-2"  name="email" value={email} id="cand-email" placeholder="Enter Candidate's email" onChange={handleEmailChange} required/> */}
//                 </div>
//                 <div className="text-center mt-8 w-full">
//                     <button type="submit" className="border-2 rounded-lg w-40 h-9 border-black border-solid bg-slate-300" onSubmit={handleSubmit} id="otp-but" >Get OTP</button>
//                 </div>
//             </form>
//         </div>
//         <div id="otp-div"  className="hidden absolute -mt-[35vw] h-48 ml-[35vw] z-100 w-96 rounded-lg text-center bg-slate-300">
//             <form className="text-center w-full" action="/add_details">
//                 <div>
//                     <button className="-ml-80" onClick={()=>closeOtp()}>Close</button>
//                 </div>
//                 <div className="mt-7">
//                     <div className="-ml-52 font-bold font-serif text-xl">Enter OTP</div >
//                     <input type="number" className="border-2 rounded-lg border-black border-solid w-80 mt-2" name="otp" value={otp} onChange={handleOtpChange} placeholder="Enter otp received on email" required/>
//                 </div>
//                 <div>
//                     <button onClick={()=>verifyOtp()} className="border-2 mt-4 rounded-lg w-32 border-black border-solid bg-slate-400" >Verify OTP</button>
//                 </div>
//             </form>
//         </div>
//         </Details>
//     </div>
//   )
// }

// export default Details1


