/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        solar: { 400: '#34d399', 500: '#10b981' },
        battery: { 400: '#22d3ee', 500: '#06b6d4' },
        price: { 400: '#fbbf24', 500: '#f59e0b' },
        grid: { 400: '#fb7185', 500: '#f43f5e' },
        margin: { 400: '#a78bfa', 500: '#8b5cf6' },
      },
    },
  },
  plugins: [],
};
