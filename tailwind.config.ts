import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          950: '#0f1e30',
          900: '#1E3A5F',
          800: '#23466B',
          700: '#2A4C72',
          600: '#345B84',
          500: '#3d6b9a',
          400: '#4e82b4',
          300: '#7aa3ca',
          200: '#a9c4de',
          100: '#d4e3f0',
          50:  '#eef4fb',
        },
        coral: {
          700: '#b91c1c',
          600: '#dc2626',
          500: '#ef4444',
        },
        sky: {
          DEFAULT: '#0ea5e9',
          dark: '#0284c7',
          light: '#38bdf8',
        },
        line: '#00b900',
      },
      fontFamily: {
        sans: ['var(--font-noto)', '"Hiragino Sans"', '"Yu Gothic"', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['3rem', { lineHeight: '1.15', fontWeight: '900' }],
        'display-lg': ['2.25rem', { lineHeight: '1.2', fontWeight: '900' }],
        'display-md': ['1.875rem', { lineHeight: '1.25', fontWeight: '800' }],
        'display-sm': ['1.5rem', { lineHeight: '1.3', fontWeight: '700' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'sm': '3px',
        DEFAULT: '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'card':     '0 1px 4px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
        'card-md':  '0 2px 8px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.04)',
        'card-lg':  '0 4px 16px rgba(0,0,0,0.12)',
        'cta':      '0 4px 14px rgba(220,38,38,0.35)',
        'nav':      '0 1px 0 rgba(0,0,0,0.10)',
      },
    },
  },
  plugins: [],
}

export default config
