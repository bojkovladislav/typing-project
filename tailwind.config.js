const flowbite = require('flowbite-react/tailwind');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', flowbite.content()],
  theme: {
    extend: {
      animation: {
        blink: 'blink 1s steps(1) infinite',
      },
      keyframes: {
        blink: {
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [flowbite.plugin()],
};
