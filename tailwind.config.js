module.exports = {
  impotant: true,
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }
      md: '768px',
      // => @media (min-width: 768px) { ... }
      lg: '1024px',
      // => @media (min-width: 1024px) { ... }
      xl: '1280px',
      // => @media (min-width: 1280px) { ... }
      xxl: '1700px',
      // => @media (min-width: 1600px) { ... }
    },
    extend: {
      colors: {
        primary: {
          P50: '#023E8A', // For buttons bg, button border, 
          P600: '#023E8A1F', // Input background
          P400: '#0096C7',  // Link / text
          DEFAULT: '#023E8A',
        },

        yellow: {
          P50: '#F0C000',
          P600: '#F0C0001F',
        },

        purple: {
          P50: '#9D5BD2',
          P600: '#9D5BD21F',
        }, 

        red: {
          P50: '#F2555A',
          P600: '#F2555A1F',
        }, 

        green: {
          P50: '#3CB179', 
          P600: '#3CB1791F',
        }, 

        white: {
          P50: '#FFFFFF', 
          P600: '#6C757D',
        },
        

        black: {
          P50: '#08090A', // Background
          P600: '#1F161E', // For lines
          P700: '#16191F', // For lines
          P800: '#13151A', // Dropdown background
          P900: '#0C0D0F', // Modal header
        },
      }
    },
  },
  plugins: [],
};
