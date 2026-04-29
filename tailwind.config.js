/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'industrial-brand': '#5E9681',
        'industrial-bg': '#F8FAFC',
        'industrial-surface': '#FFFFFF',
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
