/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      // sans: ["Space Grotesk", "sans-serif"],
      // serif: ["EB Garamond", "serif"],
      didact: ["Didact Gothic", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
})