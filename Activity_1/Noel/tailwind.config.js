/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: { ink: '#121418', panel: '#1b1f26', line: '#343a46', accent: '#67e8c5' },
      borderRadius: { ui: '0.5rem' },
      spacing: { 18: '4.5rem' },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
};
