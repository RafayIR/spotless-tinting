/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f6f7f8',
          100: '#eceef1',
          200: '#d4d8dd',
          300: '#aeb4bd',
          400: '#828b97',
          500: '#636c79',
          600: '#4d555f',
          700: '#3f454d',
          800: '#2a2e34',
          900: '#1a1d21',
          950: '#0d0f11',
        },
        accent: {
          50: '#fef4f1',
          100: '#fde8e1',
          200: '#fbd1c4',
          300: '#f8b39c',
          400: '#f58d6b',
          500: '#f16739',
          600: '#d45b32',
          700: '#a94828',
          800: '#85391f',
          900: '#652b18',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
        script: ['Yellowtail', 'cursive'],
      },
      container: {
        center: true,
        padding: { DEFAULT: '1.25rem', md: '2rem', lg: '4rem' },
        screens: { '2xl': '1320px' },
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'scale-in': 'scale-in 0.4s ease-out forwards',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
};
