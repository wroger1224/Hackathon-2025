/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'freight': ['"Freight Display Pro Black"', 'serif'],
      },
      fontSize: {
        '81': '81pt',
      },
      lineHeight: {
        '76.5': '76.5pt',
      },
    },
  },
  plugins: [],
} 