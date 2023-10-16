const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      'body': ['Lekton', ...defaultTheme.fontFamily.body],
      'mono': ['Lekton', ...defaultTheme.fontFamily.mono],
      'sans': ['Lekton', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
}

