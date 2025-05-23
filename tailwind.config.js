/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    {pattern: /desertVerde/},
    {pattern: /armorBlack/},
    {pattern: /bazookaPink/},
    {pattern: /eliteStorm/},
    {pattern: /bloodOrange/},
    {pattern: /electricalBarrier/},
  ],
  theme: {
    extend: {
      colors: {
        "desertVerde" : "#dbd5ba",
        "armorBlack" : "#1e181a",
        "bazookaPink" : "#f7bbba",
        "eliteStorm" : "#9c9d91",
        "bloodOrange" : "#dd4128",
        "electricalBarrier" : "#ebe7de",
        'main-orange': '#fb7722'
      }
    }
  },
  plugins: []
}
