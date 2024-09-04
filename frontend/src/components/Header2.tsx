import {  Link } from "react-router-dom"

function Header() {

  return (
    <div className="flex px-20 w-full shadow-md py-6" >
        <div className=''>
            <Link to="/"><img className='ml-4 mt- cursor-pointer w-[400px] aspect-auto rounded-md' src='/logoNew.jpg'></img></Link>
        </div>
        <div id="head" className=' ml-[30vw] w-[50vw] flex mt-2 h-full'>
            
            <div className='flex w-full justify-row  ml-[30vw] mt-2'>
                
                <div className="w-[8vw] border-2 font-mono rounded-2xl border-slate-200 text-[#1de9b6]  h-10 text-center text-xl font-bold cursor-pointer -mt-2 ml-16 transition-all ease-in-out hover:-transalte-y-1 hover:scale-105 hover:bg-[#eff6f4]">
                    <Link to="/details_1" >
                    <div className="mt-1">
                        Login
                        </div>
                    </Link>
                </div>
                
            </div>
            
        </div>
    </div>
  )
}

export default Header