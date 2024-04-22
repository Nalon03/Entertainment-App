/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        pureWhite: "#FFFFFF",
        redy: "#FC4747",
        darkBlue: "#10141E",
        greyishBlue: "#5A698F",
        semiDarkBlue: "#161D2F",
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
      fontSize: {
        sm: "13px",
        base: "15px",
        md: "18px",
        lg: "24px",
        xl: "32px",
      },
    },
  },
  plugins: [],
};