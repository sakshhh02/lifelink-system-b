/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F8FAFC',
        surface: '#FFFFFF',
        primary: '#0F766E',
        secondary: '#14B8A6',
        accent: '#D1FAE5',
        success: '#10B981',
        text: '#111827',
        muted: '#64748B',
        border: '#E2E8F0',
        danger: '#DC2626',
        warning: '#D97706',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '18px',
        'card-lg': '24px',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-in-out',
      },
    },
  },
  plugins: [],
};
