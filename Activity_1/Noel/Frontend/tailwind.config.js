/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: { ink: '#111318', panel: '#1b1f26', line: '#343a46', accent: '#67e8c5' },
      borderRadius: { ui: '0.5rem' },
      spacing: { 18: '4.5rem' },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      boxShadow: { card: '0 14px 32px rgba(0, 0, 0, 0.16)', cardHover: '0 20px 45px rgba(0, 0, 0, 0.28)' },
    },
  },
  plugins: [],
};
