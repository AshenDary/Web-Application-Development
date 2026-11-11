/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        noir: '#07090d',
        panel: '#121722',
        greenGlow: '#7CFF9E',
        purpleGlow: '#B994FF',
        crimson: '#FF4D5D',
        amber: '#FFC857',
      },
      boxShadow: {
        neon: '0 0 24px rgba(124, 255, 158, 0.28)',
        purple: '0 0 24px rgba(185, 148, 255, 0.25)',
      },
      backgroundImage: {
        'grid-fade': 'radial-gradient(circle at top, rgba(124,255,158,0.12), transparent 40%), radial-gradient(circle at right, rgba(185,148,255,0.12), transparent 30%)',
      },
    },
  },
  plugins: [],
};
