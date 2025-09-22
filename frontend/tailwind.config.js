/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
],
  theme: {
    extend: {
      colors: {
        'odd': '#FFE4CF', 'even':'#FFFDD7'
      }
    },
  },
  plugins: [],
})

