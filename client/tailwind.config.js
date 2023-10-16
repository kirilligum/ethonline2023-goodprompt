const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Lekton', ...defaultTheme.fontFamily.mono],
        sans: ['Gabarito', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}

