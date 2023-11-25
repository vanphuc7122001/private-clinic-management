/** @type {import('tailwindcss').Config} */
// import tailwindElement from 'tw-elements/dist/plugin.cjs'
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      }
    }
  }
  // plugins: [tailwindElement] './node_modules/tw-elements/dist/js/**/*.js'
}
