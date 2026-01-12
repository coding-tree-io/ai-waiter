import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './context/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#0b0f14',
        ink: '#f5f7ff',
        accent: '#8b1f3a',
        accentDark: '#6f172d',
        muted: '#9aa4b2',
        surface: '#111723',
        surfaceElevated: '#151d2a',
        glow: '#c75a74'
      },
      boxShadow: {
        card: '0 20px 50px -30px rgba(7, 12, 20, 0.9)',
        glow: '0 0 10px rgba(199, 90, 116, 0.25)'
      }
    }
  },
  plugins: []
};

export default config;
