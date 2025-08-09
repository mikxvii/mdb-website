/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'raleway': ['Raleway', 'sans-serif'],
        'raleway-semibold': ['Raleway', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'], // Make Inter the default sans-serif
      },
      fontSize: {
        // Responsive font sizes
        'xs-responsive': ['clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)', { lineHeight: '1.5' }],
        'sm-responsive': ['clamp(0.875rem, 0.8rem + 0.375vw, 1rem)', { lineHeight: '1.5' }],
        'lg-responsive': ['clamp(1.125rem, 1rem + 0.625vw, 1.25rem)', { lineHeight: '1.6' }],
        'xl-responsive': ['clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)', { lineHeight: '1.5' }],
        '2xl-responsive': ['clamp(1.5rem, 1.3rem + 1vw, 2rem)', { lineHeight: '1.4' }],
        '3xl-responsive': ['clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem)', { lineHeight: '1.3' }],
        '4xl-responsive': ['clamp(2.25rem, 1.8rem + 2.25vw, 3rem)', { lineHeight: '1.2' }],
        '5xl-responsive': ['clamp(3rem, 2.25rem + 3.75vw, 4rem)', { lineHeight: '1.1' }],
        '6xl-responsive': ['clamp(3.75rem, 2.75rem + 5vw, 5rem)', { lineHeight: '1' }],
      },
      fontWeight: {
        'raleway-light': '300',
        'raleway-normal': '400',
        'raleway-medium': '500',
        'raleway-semibold': '600',
        'raleway-bold': '700',
        'raleway-extrabold': '800',
        'inter-thin': '100',
        'inter-extralight': '200',
        'inter-light': '300',
        'inter-normal': '400',
        'inter-medium': '500',
        'inter-semibold': '600',
        'inter-bold': '700',
        'inter-extrabold': '800',
        'inter-black': '900',
      },
      colors: {
        // Brand Colors
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',  // Main primary color
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',  // Main secondary color
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',  // Main accent color
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        // Status Colors
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',  // Main success color
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',  // Main warning color
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',  // Main error color
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
                 // Custom MDB Colors
         mdb: {
           blue: '#253C7D',
           purple: '#8b5cf6',
           teal: '#14b8a6',
           orange: '#f97316',
           pink: '#ec4899',
           'light-blue': '#D1DFF2',
           gold: '#FEBD10',
         }
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.mdb-glass': {
          '@apply bg-white/30 backdrop-blur-md rounded-2xl shadow-lg border border-white/40': {},
        },
        '.mdb-glass-hover': {
          '@apply hover:scale-105 hover:translate-x-1 transition-all duration-300 transform hover:drop-shadow-lg origin-center': {},
        },
        '.mdb-glass-lg': {
          '@apply bg-white/30 backdrop-blur-md rounded-2xl shadow-xl border border-white/40': {},
        },
      }
      addUtilities(newUtilities)
    }
  ],
} 