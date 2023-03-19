/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "light-blue": "#ecf0f3",
        "light-black":"#252525",
        "dark-blue":"#69c0ff",
        "blue":"#1f14f5"


      }
    },
  },
  plugins: [],
}
