const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'poppins': [ 'Poppins', 'sans-serif'],
      'montserrat': [ 'Montserrat', 'sans-serif'],
      'ubuntu': ['Ubuntu', 'sans-serif'],
      'inter': ['inter', 'sans-serif'],
      'robotoSlab': ['Roboto Slab', 'serif']
    }
  },
  plugins: [],
});
