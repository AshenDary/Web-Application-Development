/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#fcf7e8',
        panel: '#ede5cc',
        line: '#81786a',
        accent: '#e7c978',
        zinc: {
          100: '#242539', 200: '#303148', 300: '#3e4057', 400: '#4e5064',
          500: '#56576b', 600: '#605e6d', 700: '#81786a', 800: '#bdb29c',
          900: '#e1d7bc', 950: '#fcf7e8',
        },
        amber: { 100: '#654617', 200: '#6f4812', 300: '#a16b20', 400: '#ae792c' },
        emerald: { 200: '#245241', 300: '#32604e', 400: '#437658' },
        rose: { 300: '#933d47' },
      },
      borderRadius: { ui: '0' },
      spacing: { 18: '4.5rem' },
      fontFamily: {
        sans: ['Tahoma', 'Verdana', 'system-ui', 'sans-serif'],
        pixel: ['Pixelify Sans', 'ui-monospace', 'monospace'],
      },
      boxShadow: { card: '3px 3px 0 #10131b', cardHover: '4px 4px 0 #10131b' },
    },
  },
  plugins: [],
};
