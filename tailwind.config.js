/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: '',
  content: [
    './src/**/*.{html,ts}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        'app': '#fafaf5',

        'primary': '#18181b',
        'secondary': '#f4f4f5',
        'danger': '#ef4444',
      },
      textColor: {
        'primary': '#09090b',
      },
      borderColor: {
        'primary': '#efefea',
        'danger': '#ef4444',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
