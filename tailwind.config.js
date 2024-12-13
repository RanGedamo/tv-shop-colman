/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: { max: '639px' }, 
        sm: '640px',          
        md: '768px',          
        lg: '1024px',         
        xl: '1280px',         
      },
    },
  },
  plugins: [],
}