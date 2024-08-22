import { useState,ChangeEvent } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Details1() {

    const navigate=useNavigate();

const [name,setName]=useState<string>('');
const [email,setEmail]=useState<string>('');
const [mobile,setMobile]=useState<string>('');
const [otp,setOtp]=useState<string>('');

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

const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

const isFormValid = (): boolean => {
  // Check if all fields are filled
  // return Object.values(formState).every(value => value.trim() !== '');
  console.log(name);
  console.log(email);
  console.log(mobile);
  // return name.trim() !== '' && email.trim() !== '' && mobile.trim() !== '' &&mobile.length==10 ;
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
  let rest_div=document.getElementById("rest-div");
  rest_div?.classList.add("blur-sm");
  rest_div?.addEventListener("click",()=>{
    closeOtp();
})
axios.post('http://localhost:3000/api/v1/user/sendOtp',{
    email:email
})
.then(function(response){
    console.log(`Otp sent successfully : ${response}`);
})
.catch(function(error){
    console.log(error);
})

  return true;
};

function closeOtp(){
    let otp_div1=document.getElementById("otp-div");
    let rest_div=document.getElementById("rest-div");
    otp_div1?.classList.add("hidden");
    rest_div?.classList.remove("blur-sm");

}

const handleSubmit = (e: React.FormEvent) => {
//   console.log("hrllo");
  e.preventDefault();
  if (isFormValid()) {
    // Submit form logic here
    let sub=document.getElementById("otp-but");
    sub?.removeAttribute("disabled");
    let otp_div=document.getElementById("otp-div");
    otp_div?.classList.remove("hidden");
    
    console.log('Form submitted:');
  }
};

function verifyOtp(){
    axios.post('http://localhost:3000/api/v1/user/verifyOtp',{
        email:email,
        otp:otp
    })
    .then(function(response){
        console.log(`Otp verified successfully : ${response}`);
        if(response.status==200){
            navigate("/details_2")
        }
    })
    .catch(function(error){
        console.log(error);
    })

}

  return (
    <div>
        <div id="rest-div" className="h-screen w-screen border-2 border-black border-solid">
            <div>
                <button onClick={()=>navigate("/")}>Home</button>
            </div>
            <form onSubmit={handleSubmit} className="p-48 relative ">
                <div id="name_inp" className="ml-6 text-center mt-5 w-full">
                    <div className="-ml-32 font-bold font-serif text-xl">Candidate's Name</div>
                    <input type="text" className="border-2 rounded-lg border-black border-solid w-80 mt-2" name="name" value={name} id="cand-name" placeholder="Enter Candidate's name" onInput={handleNameChange} required/>
                </div>
                <div className="ml-6 text-center mt-5 w-full ">
                    <div className="-ml-20 font-bold font-serif text-xl">Candidate's Mobile No.</div>
                    <input type="number" name="mobile" className="border-2 rounded-lg border-black border-solid w-80 mt-2"  id="cand-mobile" placeholder="Enter Candidate's Phone No." onInput={handleMobileChange} required/>
                </div>
                <div className="ml-6 text-center mt-5 w-full ">
                    <div className="-ml-32 font-bold font-serif text-xl">Candidate's Email</div>  
                    <input type="email" className="rounded-lg border-2 border-black border-solid w-80 mt-2"  name="email" value={email} id="cand-email" placeholder="Enter Candidate's email" onChange={handleEmailChange} required/>
                </div>
                <div className="text-center mt-8 w-full">
                    <button type="submit" className="border-2 rounded-lg w-32 border-black border-solid bg-slate-400" onSubmit={handleSubmit} id="otp-but" >Get OTP</button>
                </div>
            </form>
        </div>
        <div id="otp-div"  className="hidden absolute -mt-96 h-48 ml-[35vw] z-100 w-96 border-2 border-solid border-black text-center bg-slate-300">
            <form className="text-center w-full" action="/add_details">
                <div>
                    <button onClick={()=>closeOtp()}>Close</button>
                </div>
                <div>
                    <div className="-ml-52 font-bold font-serif text-xl">Enter OTP</div >
                    <input type="number" className="border-2 rounded-lg border-black border-solid w-80 mt-2" name="otp" value={otp} onChange={handleOtpChange} placeholder="Enter otp received on email" required/>
                </div>
                <div>
                    <button onClick={()=>verifyOtp()} className="border-2 mt-4 rounded-lg w-32 border-black border-solid bg-slate-400" >Verify OTP</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Details1