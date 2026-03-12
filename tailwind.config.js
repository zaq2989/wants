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
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        category: {
          移動: '#6366f1',
          食事: '#f59e0b',
          飲み: '#8b5cf6',
          仕事: '#10b981',
          趣味: '#ec4899',
        }
      }
    },
  },
  plugins: [],
}
