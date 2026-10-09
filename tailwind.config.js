  /** @type {import('tailwindcss').Config} */
  module.exports = {
    content: [
      "./App.{js,jsx,ts,tsx}",
      "./src/**/*.{js,jsx,ts,tsx}",
      "./components/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {


        colors: {

          // Brand
          primary: "#FCF7ED",
          secondary: "#000000",
          accent: "#A67C52",

          // // Text
          // textPrimary: "#111827",
          // textSecondary: "#6B7280",
          // textWhite: "#FFFFFF",
          
          // // Background
          // background: "#FCF7ED",
          // backgroundDark: "#000000",

          // // Border
          // border: "#E5E7EB",

          // // Status
          // success: "#22C55E",
          // warning: "#F59E0B",
          // error: "#EF4444",

        },
        fontFamily: {
          thin: ["SF-Pro-Text-Thin"],
          light: ["SF-Pro-Text-Light"],
          normal: ["SF-Pro-Text-Regular"],
          medium: ["SF-Pro-Text-Medium"],
          semibold: ["SF-Pro-Text-Semibold"],
          bold: ["SF-Pro-Text-Bold"],
          heavy: ["SF-Pro-Text-Heavy"],
          black: ["SF-Pro-Text-Black"],
        },

        fontSize: {
          '3xl': 30,  // H1
          '2xl': 24,  // H2
          'xl': 22,   // H3
          'lg': 20,   // H4
          'base': 18, // CTA
          'md': 16,   // Body
          'sm': 14,   // Small
          'xs': 12,   // Tiny
        }
      },
    },
    plugins: [],
  };