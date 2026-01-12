import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './context/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#0b0f14',
        ink: '#f5f7ff',
        accent: '#4f7cff',
        accentDark: '#3558d8',
        muted: '#9aa4b2',
        surface: '#111723',
        surfaceElevated: '#151d2a',
        glow: '#7aa2ff'
      },
      boxShadow: {
        card: '0 20px 50px -30px rgba(7, 12, 20, 0.9)',
        glow: '0 0 40px rgba(79, 124, 255, 0.25)'
      }
    }
  },
  plugins: []
};

export default config;
