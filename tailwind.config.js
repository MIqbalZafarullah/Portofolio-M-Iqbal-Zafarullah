/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        pixel: ['"Pixelify Sans"', '"Silkscreen"', 'monospace'],
        hand: ['"Caveat"', 'cursive'],
        mono: ['"Space Grotesk"', 'monospace'],
      },
      colors: {
        paper: {
          50: '#FFFFFF',
          100: '#FAF9F5',
          200: '#F4F3EE',
          line: '#E7E5DF',
        },
        folder: {
          blue: '#2563EB',
          yellow: '#F59E0B',
          dark: '#18181B',
          green: '#059669',
          pink: '#EC4899',
          purple: '#7C3AED',
          coral: '#EA580C',
        }
      },
      boxShadow: {
        'paper': '0 1px 3px rgba(0,0,0,0.06), 0 10px 20px -5px rgba(0,0,0,0.04)',
        'folder': '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'polaroid': '0 4px 15px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
        'brutal': '3px 3px 0px #000000',
        'brutal-lg': '5px 5px 0px #000000',
      }
    },
  },
  plugins: [],
}