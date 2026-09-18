import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        s7: {
          blue: '#2563eb',
          navy: '#0f172a',
          green: '#059669',
          cyan: '#0891b2'
        }
      }
    }
  },
  plugins: []
} satisfies Config;
