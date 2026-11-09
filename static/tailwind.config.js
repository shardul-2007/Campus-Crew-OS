/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        atlassian: {
          blue: '#0052CC',
          dark: '#0747A6',
          charcoal: '#172B4D',
          border: '#DFE1E6'
        }
      }
    },
  },
  plugins: [],
}
