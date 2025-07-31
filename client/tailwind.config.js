/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#222831',
        'dark-secondary': '#393E46',
        'accent-teal': '#00ADB5',
        'light-background': '#EEEEEE',
        primary: {
          DEFAULT: '#00ADB5',
          dark: '#008C94',
        },
        secondary: {
          DEFAULT: '#393E46',
        },
        background: {
          DEFAULT: '#ffffff',
          light: '#EEEEEE',
          dark: '#222831',
        },
        text: {
          primary: '#222831',
          secondary: '#393E46',
          light: '#6B7280',
          white: '#ffffff',
        },
        success: '#10B981',
        danger: '#EF4444',
      },
    },
  },
  plugins: [],
};

