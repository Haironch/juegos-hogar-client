// tailwind.config.js
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#06D6A0",
        primary: "#118AB2",
        navbar: "#FFD166",
        dark: "#073B4C",
        Red: "#EF476F"
      },
      fontFamily: {
        font: ['Titillium Web', "sans-serif"]
      },
      screens: { 
        mms: "270px", 
        ms: "320px", // px-10px 
        mm: "375px", 
        ml: "480px", // px-20px 
        ts: "576px", // px-30px 
        tm: "768px", // px-40px 
        tl: "850px", // px-60px 
        txl: "950px", // px-80px 
        ls: "1024px", 
        lm: "1100px", // 
        ll: "1200px", // 
        lxl: "1350px", 
        d: "2560px", 
      },
      
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};