module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Adjust paths as necessary
  theme: {
    extend: {
      // Customizations if any
    },
  },
  variants: {
    extend: {
      zIndex: ['hover'], // Enable hover variant for zIndex
    },
  },
  plugins: [
    // Include any plugins if used
  ],
};
