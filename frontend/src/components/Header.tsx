import {  Link } from "react-router-dom"

// bg-gradient-to-r  from-blue-950 to-blue-700
function Header() {
  return (
    <div className="flex">
        <div className='w-1/5 '>
            <Link to="/"><img className='w-60 mt-2 ml-2 cursor-pointer h-24 rounded-2xl' src='/logo.jpg'></img></Link>
        </div>
    <div id="head" className='bg-blue-950 animate-slideInFromRight shadow-md shadow-blue-700 ml-[30vw] w-[50vw] h-10 flex rounded-sm mt-2 rounded-l-2xl'>
        <div className='flex w-full justify-row ml-16 '>
            <div className="text-white text-xl font-bold cursor-pointer font-sans mt-2 ml-20 mr-20 transition-all ease-in-out hover:-transalte-y-1 hover:scale-105 hover:underline">
                <a href="#about">
                    About
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

