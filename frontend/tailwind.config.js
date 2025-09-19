// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      // Custom dark background color remains
      colors: {
        'dark-bg': '#14161B', 
      },
      // REMOVED the 'backgroundImage' block, as the grid is handled by index.css
      // and the blur/softening is handled by App.js opacity.
    },
  },
  plugins: [],
}