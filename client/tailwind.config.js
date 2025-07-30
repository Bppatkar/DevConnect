/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Simple color palette - following PDF guidelines
        primary: '#2563eb',     // Main blue
        secondary: '#64748b',   // Neutral gray
        success: '#10b981',     // Green for success
        danger: '#ef4444',      // Red for errors
        
        // Gray scale (not completely black as per PDF)
        gray: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        // Single typeface as recommended in PDF
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Limited font sizes using type scale
        sm: '14px',
        base: '16px',    // Minimum for normal text
        lg: '18px',
        xl: '20px',      // For longer text/blog posts
        '2xl': '24px',
        '3xl': '32px',
        '4xl': '48px',   // Large headlines (50px+)
      },
      spacing: {
        // Multiples of 16px rule
        '18': '4.5rem',  // 72px
        '72': '18rem',   // 288px
        '84': '21rem',   // 336px
      },
      borderRadius: {
        // Rounded elements for startup personality
        'lg': '8px',
        'xl': '12px',
      },
      boxShadow: {
        // Light shadows as per PDF
        'sm': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.05)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}