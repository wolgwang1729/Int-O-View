import { useState, useRef } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";
// import styled from "styled-components";

import { ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { setDetails } from "../features/userSlice";
import { services } from "../service/service";
import { Link } from "react-router-dom";

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
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [errors, setErrors] = useState<string>("");
  const [sendingOtp, setSendingOtp] = useState<boolean>(false);
  const dispatch = useDispatch();

  // const [otp,setOtp]=useState<string>('');

  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [verifying, setVerifying] = useState<boolean>(false);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const setValue = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (isNaN(Number(value))) {
      return;
    }

    const newOtp = [...otp];
    const enteredValue = String(e.target.value);

    newOtp[index] =
      enteredValue === "" ? "" : enteredValue[enteredValue.length - 1];
    setOtp(newOtp);

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
  };

  const moveToAnotherBox = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (index > 0 && !otp[index]) {
        const prevInput = inputRefs.current[index - 1];

        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  };

  const putCursorAtBack = (index: number) => {
    const inputElement = inputRefs.current[index];

    if (inputElement) {
      inputElement.setSelectionRange(1, 2);
    }
  };

  const handleVerify = async () => {
    setVerifying(true);
    setErrors("");

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

    try {
      const otpNumber = otp.join("");
      await services.verifyOtp({ email, otp: otpNumber });
      navigate("/details_2");
    } catch (error: any) {
      setErrors(error.message || "unexpected error occured");
      setVerifying(false);
    }
  };

  const isFormValid = (): boolean => {
    if (name.trim() === "") {
      setErrors("Name field is empty");
      return false;
    } else if (!emailRegex.test(email)) {
      setErrors("Please enter correct email");
      return false;
    } else if (mobile.length != 10) {
      setErrors("Enter valid mobile number");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors("");
    if (!isFormValid()) return;

    try {
      setSendingOtp(true);
      await axios.get(`${import.meta.env.VITE_FLASK_URL}/startServer`);
      console.log('Flask server started')

      dispatch(setDetails({ email, fullName: name, phone: mobile }));
      await services.sendOtp({ email });
      setSendingOtp(false);

      let signup_div = document.getElementById("signup-div");
      signup_div?.classList.add("hidden");
      let otp_div = document.getElementById("otp-div");
      otp_div?.classList.remove("hidden");
      otp_div?.classList.add("flex");
      const firstInput = inputRefs.current[0];
      if (firstInput) {
        firstInput.focus();
      }
    } catch (error: any) {
      setSendingOtp(false);
      setErrors(error.message || "unexpected error occured");
    }
  };

  return (
    <section className="relative">
      {/* <div id="back" className="mt-2 ml-2 cursor-pointer w-7 h-7">
        <Link to="/">
        <img src="https://cdn-icons-png.flaticon.com/128/93/93634.png"/>
        </Link>
      </div> */}
      <div
        className={`loader2 absolute top-[50%] left-[25%] ${
          sendingOtp ? "" : "hidden"
        }`}
      ></div>
      <div id="rest-div" className=" grid grid-cols-1 lg:grid-cols-2">
        <div
          className={`items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 ${
            sendingOtp ? "opacity-50" : ""
          }`}
        >
          <div className="flex flex-row justify-center">
            <Link to="/">
              <img className="h-24" src="finalLogo.jpg" />
            </Link>
          </div>
          <div className="flex items-center justify-center">
          <div
            id="otp-div"
            className="flex-col items-center justify-center hidden h-48 gap-8 w-96"
          >
            <div className="mt-[8vw] xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <div className="mt-12 ml-20 text-lg font-bold leading-tight text-black sm:text-4xl">
                OTP Verification
              </div>
              <p
                className={`ml-20 mt-5 font-bold font-mono text-center text-red-600 ${
                  errors ? "block" : "hidden"
                }`}
              >
                {errors}
              </p>
              <div
                className={`ml-20 font-semibold font-mono ${
                  errors ? "mt-5" : "mt-10"
                }`}
              >
                Enter OTP received on email
              </div>
            </div>
            <div className="flex gap-1 ml-12">
              {otp.map((val, index) => (
                <input
                  type="text"
                  key={index}
                  value={val}
                  onChange={(e) => {
                    setValue(e, index);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleVerify();
                    } else {
                      moveToAnotherBox(e, index);
                    }
                  }}
                  onClick={() => putCursorAtBack(index)}
                  ref={(input) => (inputRefs.current[index] = input)}
                  className="h-16 w-16 -mt-3 aspect-square border-[2px] rounded-md outline-none px-[1.35rem] text-3xl"
                />
              ))}
            </div>
            <div>
              <button
                className="bg-cyan-400 ml-12 mt-4 hover:bg-cyan-300 text-white rounded-md outline-none focus:bg-cyan-600 w-[21vw] h-10"
                ref={buttonRef}
                onClick={handleVerify}
                disabled={verifying}
              >
                {verifying ? "Verifying..." : "Verify"}
              </button>
            </div>
          </div>
          </div>

          {/* </OTP> */}

          <div
            id="signup-div"
            className=" xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md"
          >
            {/* <h2 className="text-xl font-bold leading-tight text-black sm:text-3xl">Get Started!</h2> */}
            <p
              className={`font-bold font-mono text-center text-red-600 ${
                errors ? "block" : "hidden"
              }`}
            >
              {errors}
            </p>
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Full Name{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Full Name"
                      id="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value.trim());
                      }}
                    ></input>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Email address{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value.trim());
                      }}
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="number"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Mobile No.{" "}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Mobile Number"
                      id="mobile"
                      value={mobile}
                      onChange={(e) => {
                        isNaN(Number(e.target.value))
                          ? null
                          : setMobile(e.target.value);
                      }}
                    ></input>
                  </div>
                </div>
                <div>
                  <button
                    onClick={handleSubmit}
                    id="otp-but"
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
        <div className="w-full h-screen -mt-8 border-2">
          <img
            className="object-cover w-full h-full mx-auto rounded-md"
            src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
            alt=""
          />
        </div>
      </div>
      {/* </div> */}
    </section>
  );
}
