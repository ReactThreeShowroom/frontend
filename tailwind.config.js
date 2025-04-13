/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    {pattern: /#dbd5ba/},
    {pattern: /#1e181a/},
    {pattern: /#f7bbba/},
    {pattern: /#9c9d91/},
    {pattern: /#dd4128/},
  ],
  theme: {
    extend: {
      colors: {
        "#dbd5ba" : "#dbd5ba",
        "#1e181a" : "#1e181a",
        "#f7bbba" : "#f7bbba",
        "#9c9d91" : "#9c9d91",
        "#dd4128" : "#dd4128",
        'main-orange': '#fb7722'
      }
    }
  },
  plugins: []
}
