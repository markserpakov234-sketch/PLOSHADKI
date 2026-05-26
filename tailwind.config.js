/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        vita: {
          orange: '#F15A29',
          orangeLight: '#F4B183',
          green: '#8DC63F',
          blue: '#4A90E2',
          purple: '#5B5BD6',
          dark: '#1A1A1A',
          bg: '#F5F5F3',
        },
      },

      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },

      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.08)',
      },
    },
  },

  plugins: [],
};
