/** @type {import('tailwindcss').Config} */
export default {
 corePlugins: {
     preflight: false,
 },
  content: ["./src/**/*.{html,js,hbs,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  prefix: 'tw-',
}

