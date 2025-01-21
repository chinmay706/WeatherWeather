/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gradientColorStops: {
        'blue-300': '#93c5fd',
        'blue-500': '#3b82f6',
        'yellow-300': '#fde68a',
        'yellow-500': '#f59e0b',
        'red-300': '#fca5a5',
        'red-500': '#ef4444',
      },
    },
  },
  plugins: [],
};
