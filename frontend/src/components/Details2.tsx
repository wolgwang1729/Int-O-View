import { useEffect, useState } from "react";
import { services } from "../service/service";
import { useDispatch, useSelector } from "react-redux";
import { setDetails } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Details2() {
  const vacancy = ["Select a Post", "SDE", "Ml-Engineer", "Junior Research Fellow"];

  const [photoName, setPhotoName] = useState<String>("");
  const [resumeName, setResumeName] = useState<String>("");
  const [showButton, setShowButton] = useState<boolean>(false);
  const reduxData = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<{
    post: string;
    photo: File | null;
    resume: File | null;
  }>({
    post: "",
    photo: null,
    resume: null,
  });

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setPhotoName(file.name);
      setData((prev) => ({ ...prev, photo: file }));
    }
  };

  const handleResume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setResumeName(file.name);
      setData((prev) => ({ ...prev, resume: file }));
    }
  };

  const handleSubmit = async () => {
    //here i have data with me
    //i have to do 3 things here
    //first upload resume
    //then create user
    //then add photo and post to redux

    try {
      if (data.resume instanceof File && data.photo instanceof File) {
        setLoading(true);

        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/setUser`,
          { post: data.post },
          {
            withCredentials: true,
          }
        );
        await services.uploadResume(data.resume);

        const copiedUserData = { ...reduxData };
        delete copiedUserData.photo;
        copiedUserData.post = data.post;

        const response = await services.createUser(
          copiedUserData,
          data.resume,
          data.photo
        );
        copiedUserData.photo = response.data.photo;
        dispatch(setDetails(copiedUserData));
        setLoading(false);
        navigate("/interview_room");
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    // Ensure the key is typed correctly
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key as keyof typeof data]; // Explicitly define key type
        if (value === "" || value === null) {
          setShowButton(false);
          return;
        }
      }
    }
    setShowButton(true);
  }, [data]);
  return (
    <div className="relative w-full h-screen">
      <div
        className={`loader2 top-[50%] left-[50%] absolute  z-50 ${
          loading ? "block" : "hidden"
        }`}
      ></div>
      <div
        className={`w-full h-screen relative ${loading ? "opacity-20" : ""}`}
      >
        <div className="h-20 w-[20vw] ml-2 mt-2">
          <img src="logo2.jpg" />
        </div>
        <div className="mt-20 text-2xl font-bold text-center">
          Just One More Step
        </div>
        <div className="flex items-center justify-center w-full h-screen -mt-32 font-mono text-xl font-extrabold">
          <div className="w-96 h-[400px] flex justify-center items-center flex-col gap-2">
            {/* <label htmlFor="post" className='w-full px-2 mb-2 text-2xl text-cyan-9 00'>Post</label> */}
            <select
              name=""
              id="post"
              defaultValue="Select a Post"
              className="border-[2px] border-gray-600 h-16 rounded-lg px-2 outline-none cursor-pointer w-full mb-2"
              onChange={(e) => {
                setData((prev) => ({ ...prev, post: e.target.value }));
              }}
            >
              {vacancy.map((val, index) => (
                <option
                  key={index}
                  value={val}
                  hidden={val === "Select a Post"}
                  className=""
                >
                  {val}
                </option>
              ))}
            </select>
            <label
              htmlFor="photo"
              className="w-full outline-none cursor-pointer"
            >
              <input
                type="file"
                name=""
                id="photo"
                className="sr-only"
                onChange={handlePhoto}
                accept=".png, .jpg, .jpeg"
              />
              <div className="flex items-center justify-center w-full py-2 text-white bg-red-500 rounded-lg">
                <img
                  src="https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg"
                  alt=""
                  className="h-12 rounded-lg aspect-auto"
                />
                <h2 className="w-[300px] flex items-center justify-end px-2">
                  {photoName || "Upload Your Photo"}
                </h2>
              </div>
            </label>
            <label
              htmlFor="resume"
              className="w-full outline-none cursor-pointer"
            >
              <input
                type="file"
                name=""
                id="resume"
                className="sr-only"
                onChange={handleResume}
                accept=".pdf"
              />
              <div className="flex items-center justify-center w-full py-2 text-white rounded-lg bg-cyan-500">
                <img
                  src="https://www.shutterstock.com/shutterstock/photos/496830214/display_1500/stock-vector-upload-cv-file-icon-vector-illustration-isolated-on-white-background-496830214.jpg"
                  alt=""
                  className="h-12 rounded-lg aspect-auto"
                />
                <h2 className="w-[300px] flex items-center justify-end px-2">
                  {resumeName || "Upload Your Resume"}
                </h2>
              </div>
            </label>
          </div>
        </div>
        {showButton && (
          <button
            className="absolute z-10 bottom-12 right-20
          font-bold font-mono px-6 py-4 rounded-md outline-none border-cyan-800 border-[2.5px] text-cyan-950"
            // style={{ background: 'linear-gradient(to right, #ef4444, #feb47b)' }}
            onClick={handleSubmit}
          >
            Enter Room
          </button>
        )}
      </div>
    </div>
  );
}

export default Details2;
