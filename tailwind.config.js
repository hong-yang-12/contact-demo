/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#ecfeff", //[cyan-50]
        headline: "#083344", //[cyan-950]
        para: "#155e75", //[cyan-800]
        button: "#06b6d4", //[cyan-500]
        buttonText: "#a5f3fc", //[cyan-200]
        placeholder: "#22d3ee", //[cyan-400] placeholder,link
        // hover : ""

      
      },
    },
    fontFamily: {
      "sans-serif": ["M PLUS Rounded 1c", "sans-serif"],
    },
  },
  plugins: [],
};
