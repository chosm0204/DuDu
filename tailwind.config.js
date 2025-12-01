/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // 둥근미소체 miso: ["DungGeunMiso", "sans-serif"],
        All: ["Allimjang", "sans-serif"],
      },
    },
  },
  plugins: [],
};
