import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {keyframes: {
      slideInFromLeft: {
        '0%': { transform: 'translateX(-100%)', opacity: 0 },
        '100%': { transform: 'translateX(0)', opacity: 1 },
      },
      slideInFromRight:{
        '0%':{transform:'translateX(100%)',opacity:0},
        '100%':{transform:'translateX(0%)',opacity:1}
      },
      slideInFromBottom:{
        '0%':{transform:'translateY(100%)',opacity:0},
        '100%':{transform:'translateX(0%)',opacity:1}
      },
      text_shadow:{
        'text-shadow':'2px 2px 2px black'
      }
    },
    animation: {
      slideInFromLeft: 'slideInFromLeft 1s ease-out forwards',
      slideInFromRight: 'slideInFromRight 1s ease-out forwards',
      slideInFromBottom: 'slideInFromBottom 0.5s ease-out forwards',
    },
  },
  },
  plugins: [],
}

