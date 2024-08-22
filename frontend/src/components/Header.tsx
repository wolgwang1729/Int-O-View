import {  Link } from "react-router-dom"


function Header() {
  return (
    <div id="head" className='bg-gradient-to-r  from-blue-950 to-blue-700 fixed w-full h-10 flex mt-[0.5px] rounded-md items-center'>
        <div className='w-1/5 '>
            <Link to="/"><img className='w-36 ml-2 cursor-pointer h-10 rounded-2xl' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvA6C3k0ihzbLPFt3op2n9FbRovQN6-dMHGw&s'></img></Link>
        </div>
        <div className='flex w-3/5 justify-row justify-end ml-48'>
            <div className="text-white text-2xl font-bold cursor-pointer font-sans mt-2 ml-20 transition-all ease-in-out hover:-transalte-y-1 hover:scale-105 hover:underline">
                <Link to="/about">
                    About
                </Link>
            </div>
            <div className="text-white text-2xl font-bold cursor-pointer font-sans mt-2 ml-20 transition-all ease-in-out hover:-transalte-y-1 hover:scale-105 hover:underline">
                Contact Us
            </div>
        </div>
        {/* <div className="flex w-1/5 justify-around">    
            <div>LogIn</div>
            <div>SignUp</div>
        </div> */}
    </div>
  )
}

export default Header

