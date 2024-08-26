import { useNavigate } from 'react-router-dom'
import styled from "styled-components";

// const FeaturesSection = styled.section`
// background-color: #0B0D17;
// color: #F0F0F0;
// padding: 4rem 2rem;
// text-align: center;

// h2 {
//   font-family: 'Oswald', sans-serif;
//   font-size: 2rem;
//   margin-bottom: 2rem;
// }

// p {
//   font-family: 'Arial', sans-serif;
//   margin-bottom: 1.5rem;
// }
// `;

const Imag=styled.section`
background-image: radial-gradient(#eb7d34 2.5px, transparent 0);
  background-size: 40px 40px;
 
`

const Footer = styled.footer`
background-color: #0B0D17;
color: #F0F0F0;
padding: 2rem 2rem;
text-align: center;
font-family: 'Arial', sans-serif;
`;

const Test=styled.section`
text-shadow:2px 2px cyan
`

const About=styled.section`
margin-top:50px;
text-shadow:1px 1px skyblue`

const Start=styled.section`
text-shadow:0.5px 1px blue
`

function Home() {
  const navigate=useNavigate();
  
    document.addEventListener('scroll',()=>{
    const animatedDiv = document.getElementById("about");
    const rect = animatedDiv?.getBoundingClientRect();
    if (rect && typeof rect.top === 'number') {
      const triggerPosition = window.innerHeight * 0.9; // Adjust trigger position as needed
      
      if (rect.top <= triggerPosition) {
        animatedDiv?.classList.add('animate-slideInFromLeft');
      }
    }
  })

  document.addEventListener('scroll',()=>{
    const animatedDiv = document.getElementById("footer");
    const rect = animatedDiv?.getBoundingClientRect();
    if (rect && typeof rect.top === 'number') {
      const triggerPosition = window.innerHeight * .9; // Adjust trigger position as needed
      
      if (rect.top <= triggerPosition) {
        animatedDiv?.classList.add('animate-slideInFromBottom');
      }
    }
  })

 
  
// drop-shadow-[2px_2px-var(--tw-shadow-color)] shadow-blue-600
  return (
    <div>
      <div className='flex w-full -mt-4'>
        <div className='pt-20 animate-slideInFromLeft flex ml-5 mt-12 w-[60vw] h-screen'>
          <Imag className='w-28 h-28 -mt-28'>
            {/* <div className=''></div> */}
          </Imag>
          <img src='/drd2.jpg' className='opacity-90 z-100 w-[43vw] h-[24vw] -ml-20 rounded-xl shadow-xl shadow-red-200'/>
          <Imag className='w-28 h-28 mt-80'>
            {/* <div className=''></div> */}
           </Imag>
          {/* <p className='font-bold font-serif absolute z-10 text-[26px] text-white mt-72'>Your Pathway to Joining India’s Elite Defence Research Team</p> */}
        </div>
        
        <div className='w-[40vw] h-screen'>
          <div className='mt-40 ml-2 mr-4'>
            <p className='text-3xl text-blue-950 font-bold font-[Source Sans Pro] leading-10'><Test><span className='bg-red-200'>Asynchronous AI video interview software </span>to screen better, faster.</Test></p>
          </div>
          <div className='flex justify-center  items-center'>
            <button onClick={()=>navigate("/details_1")} className=' mt-16 transition-all ease-in-out hover:-transalte-y-1 shadow-md shadow-blue-700 hover:scale-105 -ml-12 w-40  h-16 cursor-pointer hover:text-blue-800 rounded-xl font-bold font-serif text-xl'><Start>Let's Start</Start></button>
          </div>
        </div>
      </div>
      <div id="tech-stack" className='w-full h-96 -mt-12'>
        <div className='font-bold text-center text-3xl text_shadow'>
          Tech Stack
        </div>
        <div className='flex items-center w-[80vw] flex-row flex-wrap ml-[13vw] mt-10 '>
          <div className='mr-16'>
            <img className='h-24 w-32' src='https://icons.iconarchive.com/icons/cornmanthe3rd/plex/256/Other-html-5-icon.png'></img>
          </div>
          <div className='mr-16'>
            <img className='h-24 w-32' src='https://icons.iconarchive.com/icons/martz90/hex/256/css-3-icon.png'></img>
          </div>
          <div className='mr-16'>
            <img className='h-24 w-32' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/768px-React-icon.svg.png'></img>
          </div>
          <div className='mr-16'>
            <img className='h-24 w-32' src='data:image/png;base64,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'></img>
          </div>
          <div className='mr-16'>
            <img className='h-24 w-32' src='data:image/png;base64,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'></img>
          </div>
          <div className='mr-16 mt-12'>
            <img className='h-24 w-32' src='data:image/png;base64,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'></img>
          </div>
          <div className='mr-16 mt-10'>
            <img className='h-24 w-32' src='https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png'></img>
          </div>
          <div className='mr-16 mt-10'>
            <img className='h-24 w-32' src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/768px-MongoDB_Logo.svg.png?20190626143224'></img>
          </div>
          <div className='mr-16 mt-10'>
            <img className='h-24 w-32' src='https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/267_Python-1024.png'></img>
          </div>
          <div className='mr-16 mt-10'>
            <img className='h-24 w-32' src='https://icon.icepanel.io/Technology/svg/Vite.js.svg'></img>
          </div>
        </div>
      </div>
      <div id='about' className='ml-[2vw] flex mt-10 text-center w-full opacity-0 ' >
        {/* <h1 className='font-bold text-slate-900 text-2xl mb-5 underline'>About</h1> */}
        <div className='w-[50vw]'>
          <div className='font-bold font-serif absolute text-[28px] text-slate-950 w-[50vw] '>Your Pathway to Joining India’s Elite Defence Research Team</div>
          <div className='text-l text-justify leading-8 p-12 text-slate-600 font-serif  w-[50vw]'>
            <About>
            Welcome to Int-O-View, a revolutionary platform that harnesses the power of artificial intelligence to transform the interview preparation process for DRDO candidates. Our mission is to equip future defense professionals with the right tools and insights to excel in their interviews and secure a spot in one of India's most prestigious defense organizations.
            Our AI-driven platform simulates real-world interview scenarios, offering a unique and personalized experience for each candidate. With advanced natural language processing, our system evaluates your responses, provides instant feedback, and helps you improve your performance in technical, behavioral, and situational questions.
            Our goal is to make the interview process more accessible and efficient. Whether you're applying for research, engineering, or any other critical position within DRDO, our platform helps you build confidence, identify areas for improvement, and ensure you're fully prepared to impress the interview panel.
            By utilizing state-of-the-art AI algorithms, we provide detailed insights into your strengths and weaknesses, allowing you to refine your answers and approach. With Int-O-View, you're not just practicing for an interview – you're preparing to make a lasting impact in India's defense landscape.
            Join us today and take the next step in your journey toward a successful career with DRDO. Let us help you unlock your potential and achieve your dream of serving the nation.
            </About>
          </div>
        </div>
        <div className='ml-5 mt-32'>
          <img src='https://cdn-ddhbi.nitrocdn.com/oQUUkmjvDPdPLvhisuibbubwHakMrNcj/assets/images/optimized/rev-e2f8a2e/interviewer.ai/wp-content/uploads/2021/11/Group-33945.jpg'/>
        </div>
      </div>
      {/* <div id='about' className='ml-[2vw] flex mt-10 text-center w-full' > */}
        {/* <h1 className='font-bold text-slate-900 text-2xl mb-5 underline'>About</h1> */}
        {/* <div className='ml-5 mt-32'>
          <img src='https://cdn-ddhbi.nitrocdn.com/oQUUkmjvDPdPLvhisuibbubwHakMrNcj/assets/images/optimized/rev-e2f8a2e/interviewer.ai/wp-content/uploads/2021/11/Group-33945.jpg'/>
        </div>
        <div className='w-[50vw]'>
          <div className='font-bold font-serif absolute text-[28px] text-slate-950 w-[50vw] '>Why our </div>
          <div className='text-l text-justify leading-8 p-12 text-slate-600 font-serif  w-[50vw]'>
            <About>
            Welcome to Int-O-View, a revolutionary platform that harnesses the power of artificial intelligence to transform the interview preparation process for DRDO candidates. Our mission is to equip future defense professionals with the right tools and insights to excel in their interviews and secure a spot in one of India's most prestigious defense organizations.
            Our AI-driven platform simulates real-world interview scenarios, offering a unique and personalized experience for each candidate. With advanced natural language processing, our system evaluates your responses, provides instant feedback, and helps you improve your performance in technical, behavioral, and situational questions.
            Our goal is to make the interview process more accessible and efficient. Whether you're applying for research, engineering, or any other critical position within DRDO, our platform helps you build confidence, identify areas for improvement, and ensure you're fully prepared to impress the interview panel.
            By utilizing state-of-the-art AI algorithms, we provide detailed insights into your strengths and weaknesses, allowing you to refine your answers and approach. With Int-O-View, you're not just practicing for an interview – you're preparing to make a lasting impact in India's defense landscape.
            Join us today and take the next step in your journey toward a successful career with DRDO. Let us help you unlock your potential and achieve your dream of serving the nation.
            </About>
          </div>
        </div>
      </div> */}
      <div className='w-full text-center'>
        <div className='text-2xl font-bold text-center'>
          <p>Why Choose Our Interview Platform?</p>
        </div>
        <div className='w-[65vw] flex ml-[20vw] flex-wrap h-64 mt-10'>
          <div className='flex bg-slate-200 h-[5vw] w-[20vw] rounded-md text-center'>
            <img className='h-[4vw] w-[4.2vw] bg-purple-400 rounded-md m-2' src='https://cdn-icons-png.flaticon.com/128/7827/7827955.png'></img>
            <div className='text-center mt-4 font-bold text-lg font-serif'>
              <p className='font-[chunkFive]'>
                Secure and confidential
              </p>
              </div>
          </div>
          <div className='flex bg-slate-200 h-[5vw] w-[20vw] rounded-md text-center ml-8'>
            <img className='h-[4vw] ml-3 w-[4.2vw] bg-orange-300 rounded-md m-2' src='https://cdn-icons-png.flaticon.com/128/2669/2669764.png'></img>
            <div className='text-center ml-4 font-lg font-bold mt-4'>
            Easy scheduling
              </div>
          </div>
          <div className='flex bg-slate-200 h-[5vw] w-[20vw] rounded-md text-center ml-8'>
            <img className='h-[4vw] w-[4.2vw] bg-purple-400 rounded-md ml-3 m-2' src='https://cdn-icons-png.flaticon.com/128/2645/2645897.png'></img>
            <div className='text-center font-bold text-lg  mt-1'>
            Real-Time Notifications
              </div>
          </div>
          <div className='flex bg-slate-200 h-[5vw] w-[20vw] rounded-md text-center ml-24'>
            <img className='h-[4vw] w-[4.2vw] bg-purple-400 rounded-md m-2' src='https://cdn-icons-png.flaticon.com/128/4727/4727496.png'></img>
            <div className='text-center text-lg font-bold mt-1'>
            In-depth candidate assessment tools
              </div>
          </div>
          <div className='flex bg-slate-200 h-[5vw] w-[20vw] rounded-md text-center ml-8'>
            <img className='h-[4vw] w-[4.2vw] bg-slate-400 rounded-md m-2' src='https://cdn-icons-png.flaticon.com/128/17248/17248116.png'></img>
            <div className='text-center ml-4 text-lg font-bold mt-4'>
              Fast Response
              </div>
          </div>
        </div>
      </div>
      <div id='footer' className='opacity-0 mt-12'>
        {/* <FeaturesSection className='mt-20'>
          <h2>Why Choose Our Interview Platform?</h2>
          <p>Secure and confidential interview environment.</p>
          <p>Easy scheduling and real-time notifications.</p>
          <p>In-depth candidate assessment tools.</p>
        </FeaturesSection> */}

        <div id="contact" className='bg-white text-black border-t-2 border-t-black text-center h-20 p-5'>
          
        </div>

        {/* <Footer>
          &copy; 2024 DRDO Recruitment | All Rights Reserved
        </Footer> */}
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

