/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      fontFamily: {
        gowun: ['"Gowun Dodum"', "sans-serif"],
      },
    },
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  plugins: [],
};
