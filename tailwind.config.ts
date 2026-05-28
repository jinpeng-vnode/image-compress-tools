import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans SC"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: { DEFAULT: '#4F46E5', dark: '#3730A3' },
        accent: '#10B981'
      }
    }
  },
  plugins: []
} satisfies Config
