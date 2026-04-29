/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'industrial-brand': '#22D3EE',
        'industrial-bg': '#0F172A',
        'industrial-surface': '#1E293B',
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
