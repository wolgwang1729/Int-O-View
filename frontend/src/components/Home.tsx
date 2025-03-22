import "../index.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DollarSign, CheckCircle, Zap, ThumbsUp } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import python from "/python-removebg-preview.png";
import java from "/java-removebg-preview.png";
import cpp from "/cpp-removebg-preview.png";
import ml from "/ml-removebg-preview.png";
import emb from "/emb-removebg-preview.png";
import ScrollTrigger from "gsap/ScrollTrigger";
import land1 from "/land1.jpg";
import land2 from "/land2.jpg";
import ailog from "/ailog.png";
import Typed from "typed.js";
import roadmap from "/roadmap.png";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const images = [python, ml, java, cpp, emb];
  const [width, setWidth] = useState(0);

  const duration = 10;
  // const delay = duration/images.length
  const dabbaRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLDivElement>(null);
  const textref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dabbaRef.current) {
      setWidth(dabbaRef.current?.offsetWidth);
    }

    // if (h1Ref.current){
    //     let h1Text = h1Ref.current.textContent || "";

    //     let clutter = ""

    //     h1Text.split("").forEach((val,i)=>{
    //         if (i<Math.floor(h1Text.length/2)){
    //             clutter += `<span class="a">${val}</span>`
    //         }else{
    //             clutter += `<span class="b">${val}</span>`
    //         }
    //     })

    //     console.log(clutter)
    //     h1Ref.current.innerHTML = clutter

    //     gsap.from(".text1 .a",{
    //         opacity : 0,
    //         y : 100,
    //         duration : 0.5,
    //         stagger : 0.1
    //     })
    //     gsap.from(".text1 .b",{
    //         opacity : 0,
    //         y : 100,
    //         duration : 0.5,
    //         stagger : -0.1
    //     })
    // }
  }, []);
  const imageRefs = useRef<HTMLDivElement[]>([]);
  useGSAP(() => {
    gsap.to(".box", {
      xPercent: -100,
      duration: 8,
      repeat: -1,
      ease: "none",
      delay: -10,
      // yoyo: true,
      modifiers: {
        xPercent: gsap.utils.unitize((value) => parseFloat(value) % 100), // Ensure seamless loop
      },
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".base .first",
        scroller: "body",
        start: "top 55%",
        // scrub : 2
      },
    });

    timeline.from(".first", {
      opacity: 0,
      y: 60,
      duration: 0.2,
    });
    timeline.from(".second", {
      opacity: 0,
      y: 40,
      duration: 0.2,
    });
    timeline.from(".third", {
      opacity: 0,
      y: 40,
      duration: 0.2,
    });
    timeline.from(".fourth", {
      opacity: 0,
      y: 40,
      duration: 0.2,
    });
    timeline.from(".fifth", {
      opacity: 0,
      y: 40,
      duration: 0.2,
    });

    gsap.from(".faq", {
      opacity: 0,
      y: 50,
      duration: 0.2,
      scrollTrigger: {
        trigger: ".faq",
        scroller: "body",
        start: "top 50%",
      },
    });
  });

  if (width) {
    document.querySelectorAll("#images").forEach((box, index) => {
      gsap.to(box, {
        x: -width - 288,
        duration: duration,
        delay: index * -2,
        ease: "none",
        repeat: -1,
        modifiers: {
          xPercent: gsap.utils.unitize((value) => parseFloat(value) % 100), // Ensure seamless loop
        },
      });
    });
  }

  useEffect(() => {
    const typed = new Typed(textref.current, {
      strings: ["faster. ", "brisker. "],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true, // Enable infinite looping
      loopCount: Infinity, // Loop indefinitely
    });

    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <div className="w-full custom-scrollbar overflow-hidden">
      {/* section1 */}
      <div className="w-full flex">
        <div className="w-1/2 text-7xl font-bold flex justify-center px-24 items-center">
          <div className="text-slate-400">
            <h2 className="gradient-text text1" ref={h1Ref}>
              AI recruitment
            </h2>
            <span className="text-cyan-900 text2" ref={h2Ref}>
              engine{" "}
            </span>
            to screen better and{" "}
            <span id="typeAni" className="gradient-text" ref={textref}></span>
          </div>
        </div>
        <div className="w-1/2 p-12 grid grid-cols-2 grid-rows-2 h-[600px] gap-12 relative">
          {/* <img src={image1} alt="" className='rounded-xl mt-6 w-full h-full'/> */}
          <div className="w-full h-full relative">
            <div
              className="w-80 rounded-xl h-40 z-10 absolute -bottom-8 p-4 left-14"
              style={{
                background: "linear-gradient(to right, #DAEAFF, transparent)",
              }}
            >
              <img
                src={ailog}
                alt=""
                className="absolute h-14 aspect-square -top-8 left-32"
              />
              <div className="bg-white rounded-xl w-full h-full pt-4 px-4">
                <h1 className="font-bold font-mono text-lg mb-2 text-slate-500">
                  Tell me about yourself ?
                </h1>
                <h2 className="font-mono font-semibold gradient-text text-md">
                  Hello! Neal this side, from DTU.....
                </h2>
              </div>
            </div>
          </div>
          <img src={land1} alt="" className="h-[350px] w-full" />

          <img src={land2} alt="" className="h-full w-full" />
          <span></span>
        </div>
      </div>
      <div className="w-full px-24 flex justify-center gap-3 mt-12">
        <div className="w-4 aspect-square rounded-full border-2"></div>
        <div className="w-4 aspect-square rounded-full border-2"></div>
        <div className="w-4 aspect-square rounded-full border-2"></div>
      </div>
      {/* sections2 */}
      <div className="min-w-full overflow-hidden font-semibold text-9xl my-24 text-gray-200 flex">
        {Array.from({ length: 100 }).map((_, index) => (
          <div
            className="box flex-shrink-0"
            key={index}
            style={{ letterSpacing: "-5px" }}
          >
            Int-O-View&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        ))}
      </div>
      {/* section3 */}
      <div className="mx-auto my-12 max-w-7xl px-4 sm:px-6 md:my-24 lg:my-32 lg:px-8 base">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto inline-flex rounded-full bg-gray-100 px-4 py-1.5">
            <p className="text-xs font-semibold uppercase tracking-widest text-black">
              Tailored Interviews Powered By AI
            </p>
          </div>
          <h2 className="mt-6 text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl first">
            Int-O-View Eases Your Interview
          </h2>
          <p className="mt-14 text-base leading-relaxed text-gray-600">
            Why choose Our Platform ?
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-y-8 text-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
          <div className="second">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <DollarSign className="h-9 w-9 text-gray-700" />
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">
              Secure & Confidential
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Your data is protected with top-notch security measures, ensuring
              complete confidentiality throughout the interview process.
            </p>
          </div>
          <div className="third">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <Zap className="h-9 w-9 text-gray-700" />
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">
              Fast Responses
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Get instant feedback and responses, allowing you to quickly
              improve and adapt your interview skills.
            </p>
          </div>

          <div className="fourth">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <CheckCircle className="h-9 w-9 text-gray-700" />
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">
              In-depth Assessment
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Our platform provides a comprehensive evaluation of your skills,
              ensuring you are well-prepared for any interview scenario.
            </p>
          </div>
          <div className="fifth">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <ThumbsUp className="h-9 w-9 text-gray-700" />
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">
              Hassle Free
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Enjoy a seamless and stress-free interview preparation experience
              with our user-friendly platform.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full px-24 flex justify-center gap-3 mt-12">
        <div className="w-4 aspect-square rounded-full border-2"></div>
        <div className="w-4 aspect-square rounded-full border-2"></div>
        <div className="w-4 aspect-square rounded-full border-2"></div>
      </div>
      <div className="w-full aspect-auto px-12 flex flex-col items-center justify-center gap-8 mt-12">
        <img src={roadmap} alt="" className="w-full h-full" />
      </div>
      {/* section4 */}
      <div className="flex flex-col gap-10 justify-center items-center my-16">
        <h2 className="text-5xl font-mono font-bold">Tech Stack</h2>

        <div className="dabba" ref={dabbaRef}>
          {images.map((src, index) => (
            <div
              key={index}
              ref={(el) => (imageRefs.current[index] = el!)}
              className=""
              id="images"
            >
              <div className="">
                <img
                  src={src}
                  alt={`Image ${index + 1}`}
                  className="h-40 aspect-auto"
                />
                <h1>&nbsp;&nbsp;&nbsp;&nbsp;</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* section5 */}
      <section className="mx-auto max-w-7xl bg-gray-50 px-2 py-10 md:px-0 faq mb-32">
        <div>
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 lg:mx-auto">
              Find answers to common questions about our AI-powered interview
              platform.
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
                <h2 className="text-xl font-semibold text-black">
                  {faq.question}
                </h2>
                <p className="mt-6 text-sm leading-6 tracking-wide text-gray-500">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-gray-600">
            Can&apos;t find what you&apos;re looking for?{" "}
            <a
              href="#"
              title=""
              className="black font-semibold hover:underline"
            >
              Contact us
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
