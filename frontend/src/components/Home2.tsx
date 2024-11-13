import { DollarSign, Filter,  Moon, Star, Zap,CheckCircle,Smile, ThumbsUp } from 'lucide-react'
import image from '/fav.jpg'
import {gsap} from 'gsap';
import { useEffect, useRef } from 'react';
import python from '/python-removebg-preview.png'
import java from '/java-removebg-preview.png'
import cpp from '/cpp-removebg-preview.png'
import ml from '/ml-removebg-preview.png'
import emb from '/emb-removebg-preview.png'
import { Link, useNavigate } from 'react-router-dom';


export function Home2() {

  const images = [python,ml ,java, cpp, emb];

  const imageRefs = useRef<HTMLDivElement[]>([]);

  const navigate = useNavigate()



  return (
    <div className="w-full">

      {/* Hero Section */}
      <div className="relative w-full bg-white">
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="flex flex-col justify-center px-4 py-10 lg:px-6">
            <h1 className="mt-8 max-w-4xl text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl">
              <p className='mb-4'>Asynchronous AI video interview </p>
              <p>software to screen better, faster</p>
            </h1>
            <p className="mt-8 max-w-3xl text-lg text-gray-700">
                Elevate your interview preparation with our AI-driven platform. Gain insights, practice with real-world scenarios, and receive instant feedback to refine your skills. Our goal is to empower you to ace your interviews and land your dream job at DRDO.
            </p>
          </div>
          <div className="rounded-lg bg-gray-200 p-4">
            <img
              className="aspect-[3/2] w-full rounded-lg bg-gray-50 object-cover lg:aspect-auto lg:h-[500px] lg:object-center"
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
              alt=""
            />
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="mx-auto my-12 max-w-7xl px-4 sm:px-6 md:my-24 lg:my-32 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto inline-flex rounded-full bg-gray-100 px-4 py-1.5">
            <p className="text-xs font-semibold uppercase tracking-widest text-black">
              Tailored Interviews Powered By AI
            </p>
          </div>
          <h2 className="mt-6 text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Int-O-View Ease Your Interview
          </h2>
          <p className="mt-14 text-base leading-relaxed text-gray-600">
            Why choose Our Platform ?
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-y-8 text-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
        <div>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <DollarSign className="h-9 w-9 text-gray-700" />
          </div>
          <h3 className="mt-8 text-lg font-semibold text-black">Secure & Confidential</h3>
          <p className="mt-4 text-sm text-gray-600">
            Your data is protected with top-notch security measures, ensuring complete confidentiality throughout the interview process.
          </p>
        </div>
        <div>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <Zap className="h-9 w-9 text-gray-700" />
          </div>
          <h3 className="mt-8 text-lg font-semibold text-black">Fast Responses</h3>
          <p className="mt-4 text-sm text-gray-600">
            Get instant feedback and responses, allowing you to quickly improve and adapt your interview skills.
          </p>
        </div>

          <div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <CheckCircle className="h-9 w-9 text-gray-700" />
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">In-depth Assessment</h3>
            <p className="mt-4 text-sm text-gray-600">
              Our platform provides a comprehensive evaluation of your skills, ensuring you are well-prepared for any interview scenario.
            </p>
          </div>
          <div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <ThumbsUp className="h-9 w-9 text-gray-700" />
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">Hassle Free</h3>
            <p className="mt-4 text-sm text-gray-600">
              Enjoy a seamless and stress-free interview preparation experience with our user-friendly platform.
            </p>
          </div>
        </div>
      </div>
      <section className="mx-auto max-w-7xl bg-gray-50 px-2 py-10 md:px-0">
        <div>
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 lg:mx-auto">
              Find answers to common questions about our AI-powered interview platform.
            </p>
          </div>
          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 md:mt-16 md:grid-cols-2">
            {[
              {
                question: "How do I get started?",
                answer:
                  "To get started, simply sign up on our platform, complete your profile, and begin practicing with our AI-driven interview questions.",
              },
              {
                question: "What roles can I apply for?",
                answer:
                  "Our platform supports a wide range of roles including software engineering, data science, product management, and more. Check our role-specific practice sections for tailored questions.",
              },
              {
                question: "What tech stacks are covered?",
                answer:
                  "We cover a variety of tech stacks including JavaScript, Python, Java, C++, and many more. Our questions are designed to help you prepare for interviews in your preferred technology.",
              },
              {
                question: "How does the AI provide feedback?",
                answer:
                  "Our AI analyzes your responses in real-time and provides detailed feedback on areas of improvement, helping you refine your answers and improve your performance.",
              },
              {
                question: "Is my data secure?",
                answer:
                  "Yes, we prioritize your privacy and security. All your data is encrypted and stored securely, ensuring complete confidentiality throughout your interview preparation.",
              },
            ].map((faq, i) => (
              <div key={i}>
                <h2 className="text-xl font-semibold text-black">{faq.question}</h2>
                <p className="mt-6 text-sm leading-6 tracking-wide text-gray-500">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-gray-600">
            Can&apos;t find what you&apos;re looking for?{' '}
            <a href="#" title="" className="black font-semibold hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </section>
      <div className='flex flex-col gap-10 justify-center items-center my-16'>
            <h2 className='text-5xl font-mono font-bold'>Tech Stack</h2>
            <div className="flex flex-nowrap justify-center mt-10 overflow-hidden">
            {images.map((src, index) => (
              <div
                key={index}
                ref={(el) => (imageRefs.current[index] = el!)}
                className="flex-shrink-0 mx-2"
              >
                <img src={src} alt={`Image ${index + 1}`} className="h-40 aspect-auto" />
              </div>
              ))}
            </div>
      </div>
      <div className="mx-auto my-12 max-w-7xl px-2 py-2 md:my-24 lg:my-32 lg:px-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full md:w-2/3 lg:w-1/2">
            <h2 className="text-3xl font-bold text-black">Let's dive towards your Journey</h2>
            <p className="mt-4 text-gray-600 mb-10 font-mono font-semibold pr-14">
              Ready to take the next step in your career? Our AI-powered platform is here to help you prepare for your interviews with personalized feedback and practice questions. Click the button below to start your interview journey and unlock your potential.
            </p>
            <div>
              <button
                type="button"
                className="w-24 rounded-md bg-cyan-600 px-3 py-2 text-md font-bold font-mono text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={()=>{navigate("/details_1")}}
              >
                Start
              </button>
            </div>
          </div>
          <div className="mt-10 w-full md:w-2/3 lg:mt-0 lg:w-1/2">
            <img
              className="h-96 w-full rounded-xl object-cover"
              src={image}
              alt="Newsletter"
            />
          </div>
        </div>
      </div>      
    </div>
  )
}
