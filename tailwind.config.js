/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
  extend: {
    colors: {
      magenta: '#ff00c8',
      pink: '#ff77ff',
      purple: '#a855f7',
      cyan: '#22d3ee',
    },
  },
},
  plugins: [],
}
