/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // Add paths to your source files
  ],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['"Amiri Quran"', 'serif'], // Custom font for Arabic text
      },
      colors: {
        dark: {
          900: '#1A202C', // Dark background for dark mode
        },
        light: {
          500: '#f3f4f6', // Light background for light mode
        },
      },
      animation: {
        spin: 'spin 1s linear infinite', // Spin animation for loading spinner
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Enable tailwind forms plugin for better styling of form elements
    require('@tailwindcss/typography'), // Enable typography plugin for richer text formatting
  ],
  darkMode: 'class', // Enable dark mode support by adding 'dark' class to the HTML element
}
