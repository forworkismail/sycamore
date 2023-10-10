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
        'primary': '#0f172a',
        'secondary': '#f4f4f5',
        'tertiary': '#eaeaed',
        'danger': '#ef4444',
      },
      textColor: {
        'primary': '#09090b',
      },
      borderColor: {
        'primary': '#eaeaed',
        'secondary': '#a1a1aa',
        'danger': '#ef4444',
      }
    },
  },
  variants: {
    extend: {
      display: ["group-hover"]
    },
  },
  plugins: [],
};
