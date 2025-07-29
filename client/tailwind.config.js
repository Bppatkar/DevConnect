/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1e40af',
        },
        secondary: {
          500: '#059669',
          600: '#047857',
        },
        accent: {
          500: '#7c3aed',
          600: '#6d28d9',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Professional sans-serif
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
        '5xl': '48px',
        '6xl': '60px',
      },
      spacing: {
        // Using multiples of 16px as suggested in PDF
        '18': '4.5rem',   // 72px
        '72': '18rem',    // 288px
        '84': '21rem',    // 336px
        '96': '24rem',    // 384px
      },
      borderRadius: {
        // Matching website personality - startup/upbeat = rounded elements
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        // Following PDF shadow guidelines
        'soft': '0 2px 8px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.1)',
        'large': '0 8px 32px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}