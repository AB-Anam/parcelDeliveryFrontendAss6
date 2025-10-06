/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}", // scan all source files
  ],
  theme: {
    extend: {}, // extend Tailwind theme if needed
  },
  plugins: [],
};
