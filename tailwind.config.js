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
        pretendard: ["Pretendard", "sans-serif"],
      },
      colors: {
        brand: "#10B981", // emerald-500
        brandDark: "#059669", // emerald-600
        lightBg: "#f9fafb", // gray-50
        darkText: "#111827", // gray-900
        subText: "#6b7280", // gray-500
      },
    },
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  plugins: [],
};
