/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'abla-green': '#56A087',
        'abla-blue': '#3F5577',
        'abla-bg': '#F5F7F9',
      },
      fontSize: {
        'tech-data': '11px',
        'tech-reg': '12px',
        'tech-med': '13px',
      },
    },
  },
  plugins: [],
}
