module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-in': {
          from: { transform: 'translateY(-150%)'},
          to: { transform: 'translateY(0)' }
        }
      },
      animation: {
        'slide-in': 'slide-in 300ms ease-in-out'
      }
    },
  },
  plugins: [],
}
