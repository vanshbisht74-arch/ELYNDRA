/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#071426",
        twilight: "#102B4E",
        celestial: "#6EE7F5",
        aether: "#F7D88A",
        moonlave: "#B9A7FF",
        cloudwhite: "#F8FBFF",
        solara: {
          gold: "#F7D88A",
          amber: "#FFBF00",
          ivory: "#FFFFF0",
        },
        tidelume: {
          aqua: "#6EE7F5",
          silver: "#C0C0C0",
          deepblue: "#00008B",
        },
        verdance: {
          emerald: "#50C878",
          mint: "#98FF98",
          softgold: "#E6BE8A",
        },
        zephyra: {
          cyan: "#00FFFF",
          white: "#FFFFFF",
          lavender: "#E6E6FA",
        },
        umbralis: {
          violet: "#8F00FF",
          indigo: "#4B0082",
          silver: "#C0C0C0",
        },
      },
      fontFamily: {
        fantasy: ['Cinzel', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
