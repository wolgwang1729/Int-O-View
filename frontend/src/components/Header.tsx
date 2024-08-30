import {  Link } from "react-router-dom"
import styled from "styled-components"

// bg-gradient-to-r  from-blue-950 to-blue-700
function Header() {
    const Nav=styled.section`
    text-shadow:2px 2px black`
  return (
    <div className="flex">
        <div className='w-1/5 '>
            <Link to="/"><img className='w-72 ml-4 cursor-pointer h-[10vw] rounded-md' src='/logo1.jpg'></img></Link>
        </div>
    <div id="head" className='bg-blue-950 animate-slideInFromRight shadow-md shadow-blue-700 ml-[30vw] w-[50vw] h-10 flex mt-2 rounded-l-xl'>
        <div className='flex w-full justify-row ml-32 '>
            
            <div className="text-white text-xl font-bold cursor-pointer font-sans mt-2 mr-20 transition-all ease-in-out hover:-transalte-y-1 hover:scale-105 hover:underline">
                <a href="#about">
                    <Nav>
                    About
                    </Nav>
                </a>
            </div>
            <div className="text-white text-xl font-bold cursor-pointer font-sans mt-2 ml-15 transition-all ease-in-out hover:-transalte-y-1 hover:scale-105 hover:underline">
                <a href="#contact">
                 Contact
                </a>
            </div>
            <div className="text-white text-xl font-bold cursor-pointer font-sans mt-2  ml-20 transition-all ease-in-out hover:-transalte-y-1 hover:scale-105 hover:underline">
                <Link to="/details_1">
                    Login
                </Link>
            </div>
            
        </div>
        {/* <div className="flex w-1/5 justify-around">    
            <div>LogIn</div>
            <div>SignUp</div>
        </div> */}
    </div>
    </div>
  )
}

export default Header

