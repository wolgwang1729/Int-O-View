import  { useEffect, useState } from 'react'
import { services } from '../service/service'
import { useDispatch, useSelector } from 'react-redux'
import { setDetails } from '../features/userSlice'
import { useNavigate } from 'react-router-dom'

function Details2() {
  

    const vacancy = ["Post","SDE","Ml-Engineer","Junior Research Fellow"]

    const [photoName, setPhotoName] = useState<String>("")
    const [resumeName, setResumeName] = useState<String>("")
    const [showButton, setShowButton] = useState<boolean>(false)
    const reduxData = useSelector((state:any)=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [data, setData] = useState<{
      post: string;
      photo: File | null;
      resume: File | null;
  }>({
      post: "",
      photo: null,
      resume: null
  });
  

    const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files ? e.target.files[0] : null;
      if (file) {
          setPhotoName(file.name);
          setData(prev => ({ ...prev, photo: file }));
      }
  };
  
    const handleResume = (e: React.ChangeEvent<HTMLInputElement>)=>{
      const file = e.target.files ? e.target.files[0] : null;
      if(file){
        setResumeName(file.name)
        setData(prev => ({...prev, resume : file}))
      }

    }

    const handleSubmit = async()=>{
      //here i have data with me
      //i have to do 3 things here
      //first upload resume
      //then create user
      //then add photo and post to redux


      try {
        
        if (data.resume instanceof File && data.photo instanceof File){

          await services.uploadResume(data.resume)

          const copiedUserData = {...reduxData}
          delete copiedUserData.photo
          copiedUserData.post = data.post
          
          const response = await services.createUser(copiedUserData,data.resume,data.photo)
          copiedUserData.photo = response.data.photo
          dispatch(setDetails(copiedUserData))
          navigate("/")

        }       


      } catch (error) {
        throw error  
      }

    }

    useEffect(() => {
      // Ensure the key is typed correctly
      for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
              const value = data[key as keyof typeof data]; // Explicitly define key type
              if (value === ""||value===null) {
                  setShowButton(false);
                  return;
              }
          }
      }
      setShowButton(true);
  }, [data]);
// data:image/png;base64,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
  return (
    <div className='w-full h-screen relative'>
      <div className='h-20 w-[20vw] ml-2 mt-2'>
        <img src='logo1.jpg'/>
      </div>
      <div className='mt-20 ml-96 font-bold text-2xl'>
        Just One Step More
      </div>
        <div className='h-screen w-full justify-center items-center flex font-mono font-extrabold text-xl -mt-32'>
            <div className='w-96 h-[400px] flex justify-center items-center flex-col gap-2'>
                {/* <label htmlFor="post" className='w-full px-2 mb-2 text-2xl text-cyan-9  00'>Post</label> */}
                <select name="" id="post" className='border-[2px] border-gray-600 h-16 rounded-lg px-2 outline-none cursor-pointer w-full mb-2'
                onChange={(e)=>{setData(prev => ({...prev, post : e.target.value}))}}>
                    {
                        vacancy.map((val, index)=>(
                            <option key={index} value={val} hidden={val==="Post"} selected = {val==="Post"} className=''>{val}</option>
                        ))
                    }
                </select>
                <label htmlFor="photo" className='w-full cursor-pointer outline-none'>
                    <input type="file" name="" id="photo" className='sr-only' onChange={handlePhoto} accept='.png, .jpg, .jpeg'/>
                    <div className='w-full bg-red-500 text-white flex justify-center py-2 rounded-lg items-center'>
                        <img src="https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg" alt="" className='h-12 aspect-auto rounded-lg'/>
                        <h2 className='w-[300px] flex items-center justify-end px-2'>{photoName || "Upload Your Photo"}</h2>
                    </div>
                </label>
                <label htmlFor="resume" className='w-full cursor-pointer outline-none'>
                    <input type="file" name="" id="resume" className='sr-only' onChange={handleResume} accept='.pdf'/>
                    <div className='w-full bg-cyan-500 text-white flex justify-center py-2 rounded-lg items-center'>
                        <img src="https://www.shutterstock.com/shutterstock/photos/496830214/display_1500/stock-vector-upload-cv-file-icon-vector-illustration-isolated-on-white-background-496830214.jpg" alt="" className='h-12 aspect-auto rounded-lg'/>
                        <h2 className='w-[300px] flex items-center justify-end px-2'>{resumeName || "Upload Your Resume"}</h2>
                    </div>
                </label>
            </div>
        </div>
       {showButton && <button className='absolute z-10 bottom-12 right-20
        font-bold font-mono px-6 py-4 rounded-md outline-none border-cyan-800 border-[2.5px] text-cyan-950'
        // style={{ background: 'linear-gradient(to right, #ef4444, #feb47b)' }}
        onClick={handleSubmit}>Enter Room</button>}
    </div>
  )
}




export default Details2;