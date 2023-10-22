/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,vue}"],
  theme: {
    extend: {
      fontSize: {
        "4xl": "3.125rem", // 48px
        "3xl": "2.375rem", // 38px
        "2xl": "1.5rem", // 24px
        xl: "1.25rem", // 20px
        lg: "1rem", // 16px
        base: "15px", // 15px
        sm: "0.75rem", // 12px
        xs: "0.625rem", // 10px
      },
      spacing: {
        15: "3.75rem",
        30: "7.5rem",
      },
      colors: {
        brand: {
          900: "#040F31",
          800: "#12245A",
          700: "#2B4083",
          600: "#4D64AB",
          500: "#7A90D4",
          400: "#B1C3FD",
          300: "#C0CFFF",
          200: "#CDDAFF",
          100: "#DBE4FF",
          50: "#E9EEFF",
        },
        sky: {
          900: "#003A4F",
          800: "#065471",
          700: "#107093",
          600: "#1D8CB5",
          500: "#2FAAD7",
          400: "#26CBFD",
          300: "#70D8FF",
          200: "#99E4FF",
          100: "#C3EFFF",
          50: "#ECFAFF",
        },
        blue: {
          900: "#012B5D",
          800: "#093F7F",
          700: "#1454A1",
          600: "#3077CF",
          500: "#3585E5",
          400: "#499BFF",
          300: "#72B2FF",
          200: "#9BC8FF",
          100: "#C4DEFF",
          50: "#EDF5FF",
        },
        green: {
          900: "#144F2D",
          800: "#227144",
          700: "#33935C",
          600: "#47B576",
          500: "#5FD792",
          400: "#79F9B0",
          300: "#99FFC5",
          200: "#B7FFD6",
          100: "#D4FFE6",
          50: "#F2FFF7",
        },
        emerald: {
          900: "#2A4033",
          800: "#3D5949",
          700: "#51735F",
          600: "#668C76",
          500: "#7BA58D",
          400: "#92BFA5",
          300: "#AAD8BE",
          200: "#C3F2D7",
          100: "#DCF6E7",
          50: "#F6FBF8",
        },
        yellow: {
          900: "#5A4200",
          800: "#7C5B00",
          700: "#9E7401",
          600: "#C0900D",
          500: "#E2AD1D",
          400: "#FFC731",
          300: "#FFD45F",
          200: "#FFE08D",
          100: "#FFEDBC",
          50: "#FFF9EA",
        },
        red: {
          900: "#630800",
          800: "#850B00",
          700: "#A71508",
          600: "#C92617",
          500: "#EB3B2A",
          400: "#FF4F3F",
          300: "#FF776A",
          200: "#FF9E95",
          100: "#FFC6C0",
          50: "#FFEDEC",
        },
        purple: {
          900: "#1E1653",
          800: "#302475",
          700: "#433597",
          600: "#5A4AB9",
          500: "#7362DB",
          400: "#8F7DFD",
          300: "#AFACFF",
          200: "#C2B8FF",
          100: "#DBD5FF",
          50: "#F4F2FF",
        },
        brown: {
          900: "#4F2610",
          800: "#713A1B",
          700: "#93502A",
          600: "#B5673C",
          500: "#D78151",
          400: "#F99D69",
          300: "#FFB58D",
          200: "#FFCBAE",
          100: "#FFE0CF",
          50: "#FFF5F0",
        },
        slate: {
          900: "#4E4A4A",
          800: "#625F5F",
          700: "#777575",
          600: "#8B8B8B",
          500: "#9F9F9F",
          400: "#B4B4B4",
          300: "#C8C8C8",
          200: "#DDDDDD",
          100: "#F1F1F1",
          50: "#FFF",
        },
        stone: {
          900: "#4A4343",
          800: "#5E5656",
          700: "#726B6B",
          600: "#878080",
          500: "#9B9696",
          400: "#B0ADAD",
          300: "#C4C4C4",
          200: "#D8D8D8",
          100: "#EDEDED",
          50: "#F4F4F4",
        },
        gray: {
          900: "#31363B",
          800: "#43494F",
          700: "#565D64",
          600: "#6A7178",
          500: "#7E858C",
          400: "#939AA1",
          300: "#A9AFB5",
          200: "#BFC4CA",
          100: "#D6DADE",
          50: "#FBFCFD",
        },
      },
    },
  },
  plugins: [],
};
