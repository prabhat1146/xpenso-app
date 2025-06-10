/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  safelist: ["scrollbar-hide"],
  plugins: [require("tailwind-scrollbar-hide")],
};
