/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'divine': {
          50: '#fdfbe4',
          100: '#faf3c0',
          200: '#f5e57d',
          300: '#edd037',
          400: '#d4af37',
          500: '#b8921f',
          600: '#946e16',
          700: '#6e4f14',
          800: '#4a3413',
          900: '#2a1d0a',
        },
        'mystic': {
          50: '#f0eeff',
          100: '#e2ddff',
          200: '#c6baff',
          300: '#a08cff',
          400: '#8b5cf6',
          500: '#7c3aed',
          600: '#6d28d9',
          700: '#5b21b6',
          800: '#4c1d95',
          900: '#2e1065',
        },
        'void': {
          50: '#f8f9fc',
          100: '#eef0f7',
          200: '#d5daef',
          300: '#adb6e0',
          400: '#7f8fcc',
          500: '#5f6eb8',
          600: '#4a57a4',
          700: '#3d4785',
          800: '#333b6b',
          900: '#0a0a1a',
          950: '#06060f',
        }
      },
      fontFamily: {
        'serif': ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        'hebrew': ['Arial Hebrew', 'Arial', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.8', filter: 'brightness(1)' },
          '50%': { opacity: '1', filter: 'brightness(1.3)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
