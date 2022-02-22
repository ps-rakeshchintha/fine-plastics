const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.red,
        secondary: colors.neutral
      },
      fontFamily: {
        sans: ['Work Sans', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}
