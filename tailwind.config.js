const defaultTheme = require('tailwindcss/defaultConfig');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  important: true,
  theme: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: "#3B81F6",
      white: '#ffffff',
      black: '#000000',
      violet: '#1E40AF',
      blue: "#3B81F6",
      darkblue: "#e11d48",
      text: {
        DEFAULT: "#4F586E",
        light: "#4F586E",
      },
      light: {
        DEFAULT: "#FAFBFC",
        lighter: "#F3F4F6",
      },
    },
    extend: {},
  },
  plugins: [],
}
