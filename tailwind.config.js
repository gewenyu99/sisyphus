/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'sisyphus-green': '#a8d400',
        'sisyphus-green-light': '#c3e600',
        'sisyphus-green-dark': '#8ab600',
        'sisyphus-grey': '#221b21',
        'sisyphus-grey-light': '#464646',
        'sisyphus-grey-dark': '#000000',
        'sisyphus-blue': '#4d6e91',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
