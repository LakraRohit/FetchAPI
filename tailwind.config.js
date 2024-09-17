// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }



/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(3px, -5px)' },
          '50%': { transform: 'translate(-3px, 3px)' },
          '75%': { transform: 'translate(5px, 2px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
      },
      animation: {
        floating: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
