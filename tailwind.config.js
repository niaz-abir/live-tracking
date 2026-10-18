/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: { extend: { colors: { ink: "#10223b", mint: "#baf7d0" }, boxShadow: { soft: "0 20px 60px rgba(15, 35, 65, .10)" } } },
  plugins: [],
};