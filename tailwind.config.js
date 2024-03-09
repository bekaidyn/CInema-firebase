/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    container: {
      padding: '4rem',
      center: true,
    },

    screens: {
      'sm': '320px',
      'sm1': '500px',
      // => @media (min-width: 576px) { ... }
      'md': '640px',
      'md2': '720px',
      'md1': '820px',
      // => @media (min-width: 768px) { ... }
      'lg1': '1024px',
      'lg': '1280px',
      // => @media (min-width: 992px) { ... }

      'xl': '2560px',
      // => @media (min-width: 1200px) { ... }
    },
    extend: {
      strokeWidth: {
        '2': '2px',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'purple': '#3f3cbb',
        'midnight': '#121063',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
        'MidnightBlue-300': '#0d2841',
        'CeruleanBlue-300': '#1e7898',
        'w-blue-300': '#2187ab'
      },
    },
  },
  plugins: [],
}
