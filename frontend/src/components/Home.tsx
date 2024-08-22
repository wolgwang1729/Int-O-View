import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate=useNavigate();

  return (
    <div className='bg-gradient-to-t from-green-200 to-slate-100'>
      <div className='pt-72 w-full ml-2 text-center'>
        <p className='font-bold font-serif text-[26px] text-green-900'>Your Pathway to Joining India’s Elite Defence Research Team</p>
      </div>
      <div className='flex justify-center h-screen w-screen items-center'>
        <button onClick={()=>navigate("/details_1")} className='bg-blue-300 transition-all ease-in-out hover:-transalte-y-1 -mt-[39vw] hover:scale-100 -ml-12 w-40  h-16 cursor-pointer hover:text-blue-800 rounded-2xl font-bold font-serif text-xl'>Let's Start</button>
      </div>
    </div>
  )
}

export default Home;






 // import React,{useState,ChangeEvent} from "react";



// // function Home() {
  
// // //   restbody.addEventListener('click', () => {
// // //     let sidebar=document.getElementById("side-bar");
// // //     const hasclass=sidebar?.classList.contains("-right-0");
// // //     if(hasclass){
// // //       sidebar?.classList.remove("-right-0");
// // //     }
// // // })

// const [name,setName]=useState<string>('');
// const [email,setEmail]=useState<string>('');
// const [mobile,setMobile]=useState<string>('');

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
//   return true;
//   // if(name.trim()===''){

//   // }
// };

// const handleSubmit = (e: React.FormEvent) => {
//   console.log("hrllo");
//   e.preventDefault();
//   if (isFormValid()) {
//     // Submit form logic here
//     let sub=document.getElementById("otp-but");
//     sub?.removeAttribute("disabled");
//     let otp_div=document.getElementById("otp-div");
//     otp_div?.classList.remove("hidden")
//     console.log('Form submitted:');
//   }
// };

// //   function showBar(){
// //     let sidebar=document.getElementById("side-bar");
// //     let restbody=document.getElementById("rest-body");
// //     let body_1=document.getElementById("head");
// //     sidebar?.classList.remove("hidden");
// //     body_1?.classList.add("opacity-75");
// //     // sidebar?.classList.remove("-right-1/3");
// //     // sidebar?.classList.add("-right-0");
// //     restbody?.classList.add("opacity-75");
// //     restbody?.addEventListener("click",()=>{
// //       closeBar();
// //     })
// //   }
//   function closeBar(){
//     let sidebar=document.getElementById("side-bar");
//     let restbody=document.getElementById("rest-body");
//     let body_1=document.getElementById("head");
//     sidebar?.classList.add("hidden");
//     // sidebar?.classList.add("-right-1/3");
//     // sidebar?.classList.remove("-right-0");
//     restbody?.classList.remove("opacity-75");
//     body_1?.classList.remove("opacity-75");
//   }

// //   // function nextBut(){
// //   //   let ab=document.getElementById("name_inp");
// //   //   ab?.classList.add("hidden");
// //   // }
 
// //   return (
// //     <div className="w-full h-screen bg-blue-200 flex group">
// //       <div id="rest-body" className="w-2/3  h-full flex  items-center flex-row justify-end ">
// //        <button id="inter-but" className="bg-red-600 w-40  h-16 mr-52 cursor-pointer hover:text-blue-800 rounded-2xl" onClick={showBar}>Start Interview</button>
// //       </div>
// //      <div id="side-bar" className=" border-2 border-solid hidden border-black bg-slate-50 absolute  h-screen w-1/3 ">
// //       <button onClick={closeBar}>Close</button>
// //       <form onSubmit={handleSubmit}>
// //         <div id="name_inp" className="ml-6 text-center mt-5 w-full ">
// //           <div className="-ml-32 font-bold font-serif text-xl">Candidate's Name</div>
// //           <input type="text" className="border-2 rounded-lg border-black border-solid w-80 mt-2" name="name" value={name} id="cand-name" placeholder="Enter Candidate's name" onInput={handleNameChange} required/>
// //         </div>
// //         {/* <button>Next</button>   */}
// //         <div className="ml-6 text-center mt-5 w-full ">
// //           <div className="-ml-20 font-bold font-serif text-xl">Candidate's Mobile No.</div>
// //           <input type="number" name="mobile" className="border-2 rounded-lg border-black border-solid w-80 mt-2"  id="cand-mobile" placeholder="Enter Candidate's Phone No." onInput={handleMobileChange} required/>
// //         </div>
// //         <div className="ml-6 text-center mt-5 w-full ">
// //           <div className="-ml-32 font-bold font-serif text-xl">Candidate's Email</div>  
// //           <input type="email" className="rounded-lg border-2 border-black border-solid w-80 mt-2"  name="email" value={email} id="cand-email" placeholder="Enter Candidate's email" onChange={handleEmailChange} required/>
// //         </div>
// //         <div className="text-center mt-8 w-full">
// //           <button type="submit" className="border-2 rounded-lg w-32 border-black border-solid bg-slate-400" onSubmit={handleSubmit} id="otp-but" >Get OTP</button>
// //         </div>
// //         </form>
// //           <form id="otp-div" className="hidden ml-6 text-center mt-5 w-full" action="/add_details">
// //             <div className="-ml-52 font-bold font-serif text-xl">Enter OTP</div >
// //             <input type="number" className="border-2 rounded-lg border-black border-solid w-80 mt-2" name="otp1" placeholder="Enter otp received on email" required/>
// //           <div>
// //             <button className="border-2 mt-4 rounded-lg w-32 border-black border-solid bg-slate-400">Verify OTP</button>
// //           </div>
// //         </form>
      
// //     </div>
// //     </div>
// //   )
// // }

// // export default Home

// // // "use client"
// // // import React from 'react';
// // // import styled from 'styled-components';

// // // const Navbar = styled.nav`
// // //   background-color: #0B0D17;
// // //   padding: 1rem 2rem;
// // //   display: flex;
// // //   justify-content: space-between;
// // //   align-items: center;
// // //   position: sticky;
// // //   top: 0;
// // //   z-index: 1000;
// // // `;

// // // const NavBrand = styled.div`
// // //   font-family: 'Oswald', sans-serif;
// // //   font-size: 1.5rem;
// // //   color: #F0F0F0;
// // // `;

// // // const NavLinks = styled.div`
// // //   display: flex;
// // //   gap: 1.5rem;

// // //   a {
// // //     color: #F0F0F0;
// // //     text-decoration: none;
// // //     font-family: 'Oswald', sans-serif;
// // //     font-size: 1rem;
// // //     transition: color 0.3s;

// // //     &:hover {
// // //       color: #F39C12;
// // //     }
// // //   }
// // // `;

// // // const HeroSection = styled.section`
// // //   background-image: url('/DRDO.jpg');
// // //   background-size: cover;
// // //   background-position: center;
// // //   height: 100vh;
// // //   color: #F0F0F0;
// // //   display: flex;
// // //   flex-direction: column;
// // //   justify-content: center;
// // //   align-items: center;
// // //   text-align: center;
// // //   padding: 0 2rem;
// // // `;

// // // const HeroText = styled.h1`
// // //   font-size: 3rem;
// // //   font-family: 'Oswald', sans-serif;
// // //   font-weight: bold;
// // //   margin-bottom: 1rem;
// // // `;

// // // const SubText = styled.p`
// // //   font-size: 1.2rem;
// // //   font-family: 'Arial', sans-serif;
// // //   margin-bottom: 2rem;
// // // `;

// // // const CTAButton = styled.a`
// // //   padding: 1rem 2rem;
// // //   background-color: #F39C12;
// // //   color: #0B0D17;
// // //   font-family: 'Oswald', sans-serif;
// // //   font-size: 1rem;
// // //   text-transform: uppercase;
// // //   text-decoration: none;
// // //   border-radius: 5px;
// // //   transition: background-color 0.3s;

// // //   &:hover {
// // //     background-color: #D35400;
// // //   }
// // // `;

// // // const FeaturesSection = styled.section`
// // //   background-color: #0B0D17;
// // //   color: #F0F0F0;
// // //   padding: 4rem 2rem;
// // //   text-align: center;

// // //   h2 {
// // //     font-family: 'Oswald', sans-serif;
// // //     font-size: 2rem;
// // //     margin-bottom: 2rem;
// // //   }

// // //   p {
// // //     font-family: 'Arial', sans-serif;
// // //     margin-bottom: 1.5rem;
// // //   }
// // // `;

// // // const Footer = styled.footer`
// // //   background-color: #0B0D17;
// // //   color: #F0F0F0;
// // //   padding: 2rem 2rem;
// // //   text-align: center;
// // //   font-family: 'Arial', sans-serif;
// // // `;

// // // const Home: React.FC = () => {
// // //   restbody.addEventListener('click', () => {
// // //     //     let sidebar=document.getElementById("side-bar");
// // //     //     const hasclass=sidebar?.classList.contains("-right-0");
// // //     //     if(hasclass){
// // //     //       sidebar?.classList.remove("-right-0");
// // //     //     }
// // //     // })
    
// // //     const [name,setName]=useState<string>('');
// // //     const [email,setEmail]=useState<string>('');
// // //     const [mobile,setMobile]=useState<string>('');
    
// // //     const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
// // //       setName(e.target.value.trim());
// // //       console.log(name);
// // //     };
    
// // //     const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
// // //       setEmail(e.target.value);
// // //     };
    
// // //     const handleMobileChange = (e: ChangeEvent<HTMLInputElement>) => {
// // //       setMobile(e.target.value);
// // //     };
    
// // //     const isFormValid = (): boolean => {
// // //       // Check if all fields are filled
// // //       // return Object.values(formState).every(value => value.trim() !== '');
// // //       console.log(name);
// // //       console.log(email);
// // //       console.log(mobile);
// // //       // return name.trim() !== '' && email.trim() !== '' && mobile.trim() !== '' &&mobile.length==10 ;
// // //       if(name.trim()===''){
// // //         window.alert("Please enter name");
// // //         return false;
// // //       }
// // //       else if(email.trim()===''){
// // //         window.alert("Please enter email");
// // //         return false;
// // //       }
// // //       else if(mobile.length!=10){
// // //         window.alert("Enter valid mobile number");
// // //         return false;
// // //       }
// // //       return true;
// // //       // if(name.trim()===''){
    
// // //       // }
// // //     };
    
// // //     const handleSubmit = (e: React.FormEvent) => {
// // //       console.log("hrllo");
// // //       e.preventDefault();
// // //       if (isFormValid()) {
// // //         // Submit form logic here
// // //         let sub=document.getElementById("otp-but");
// // //         sub?.removeAttribute("disabled");
// // //         let otp_div=document.getElementById("otp-div");
// // //         otp_div?.classList.remove("hidden")
// // //         console.log('Form submitted:');
// // //       }
// // //     };
    
// // //       function showBar(){
// // //         let sidebar=document.getElementById("side-bar");
// // //         let restbody=document.getElementById("rest-body");
// // //         let body_1=document.getElementById("head");
// // //         sidebar?.classList.remove("hidden");
// // //         body_1?.classList.add("opacity-75");
// // //         // sidebar?.classList.remove("-right-1/3");
// // //         // sidebar?.classList.add("-right-0");
// // //         restbody?.classList.add("opacity-75");
// // //         restbody?.addEventListener("click",()=>{
// // //           closeBar();
// // //         })
// // //       }
// // //       function closeBar(){
// // //         let sidebar=document.getElementById("side-bar");
// // //         let restbody=document.getElementById("rest-body");
// // //         let body_1=document.getElementById("head");
// // //         sidebar?.classList.add("hidden");
// // //         // sidebar?.classList.add("-right-1/3");
// // //         // sidebar?.classList.remove("-right-0");
// // //         restbody?.classList.remove("opacity-75");
// // //         body_1?.classList.remove("opacity-75");
// // //       }
// // //   return (
// // //     <>
// // //     <div>
// // //       <Navbar>
// // //         <NavBrand>DRDO Recruitment</NavBrand>
// // //         <NavLinks>
// // //           <a href="#home">Home</a>
// // //           <a href="#features">Features</a>
// // //           <a href="#contact">Contact</a>
// // //         </NavLinks>
// // //       </Navbar>

// // //       <HeroSection id="home">
// // //         <HeroText>Join the Elite Force</HeroText>
// // //         <SubText>Your path to joining DRDO starts here</SubText>
// // //         <CTAButton href="/register">Register</CTAButton>
// // //       </HeroSection>

// // //       <FeaturesSection id="features">
// // //         <h2>Why Choose Our Interview Platform?</h2>
// // //         <p>Secure and confidential interview environment.</p>
// // //         <p>Easy scheduling and real-time notifications.</p>
// // //         <p>In-depth candidate assessment tools.</p>
// // //       </FeaturesSection>
// // //       </div>

// // //       <div id="side-bar" className=" border-2 border-solid hidden border-black bg-slate-50 absolute  h-screen w-1/3 ">
// // //        <button onClick={closeBar}>Close</button>
// // //        <form onSubmit={handleSubmit}>
// // //          <div id="name_inp" className="ml-6 text-center mt-5 w-full ">
// // //            <div className="-ml-32 font-bold font-serif text-xl">Candidate's Name</div>
// // //            <input type="text" className="border-2 rounded-lg border-black border-solid w-80 mt-2" name="name" value={name} id="cand-name" placeholder="Enter Candidate's name" onInput={handleNameChange} required/>
// // //          </div>
// // //          {/* <button>Next</button>   */}
// // //          <div className="ml-6 text-center mt-5 w-full ">
// // //            <div className="-ml-20 font-bold font-serif text-xl">Candidate's Mobile No.</div>
// // //            <input type="number" name="mobile" className="border-2 rounded-lg border-black border-solid w-80 mt-2"  id="cand-mobile" placeholder="Enter Candidate's Phone No." onInput={handleMobileChange} required/>
// // //          </div>
// // //          <div className="ml-6 text-center mt-5 w-full ">
// // //            <div className="-ml-32 font-bold font-serif text-xl">Candidate's Email</div>  
// // //            <input type="email" className="rounded-lg border-2 border-black border-solid w-80 mt-2"  name="email" value={email} id="cand-email" placeholder="Enter Candidate's email" onChange={handleEmailChange} required/>
// // //          </div>
// // //          <div className="text-center mt-8 w-full">
// // //            <button type="submit" className="border-2 rounded-lg w-32 border-black border-solid bg-slate-400" onSubmit={handleSubmit} id="otp-but" >Get OTP</button>
// // //          </div>
// // //          </form>
// // //            <form id="otp-div" className="hidden ml-6 text-center mt-5 w-full" action="/add_details">
// // //              <div className="-ml-52 font-bold font-serif text-xl">Enter OTP</div >
// // //              <input type="number" className="border-2 rounded-lg border-black border-solid w-80 mt-2" name="otp1" placeholder="Enter otp received on email" required/>
// // //            <div>
// // //              <button className="border-2 mt-4 rounded-lg w-32 border-black border-solid bg-slate-400">Verify OTP</button>
// // //            </div>
// // //          </form>
      
// // //      </div>

// // //       <Footer>
// // //         &copy; 2024 DRDO Recruitment | All Rights Reserved
// // //       </Footer>
// // //     </>
// // //   );
// // // };

// // // export default Home;

// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// function Home() {

//   const navigate = useNavigate()
//   // const [loading, setLoading] = useState(true)



//   // useEffect(()=>{
//   //   setTimeout(()=>{
//   //     setLoading(false)
//   //   },5000)
//   // },[])

//   // loading ? (
//   //   <div>Loading</div>
//   // ):

//   return(
//     <div>
//       <div>Home</div>
//       <button onClick={()=>navigate("/name")}>Let's start</button>
//     </div>
//   )
// }

// export default Home

