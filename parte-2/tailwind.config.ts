import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          deep: '#0a0a0b',
          surface: '#111113',
          card: '#17171a',
          hover: '#1e1e22',
        },
        accent: {
          DEFAULT: '#5b6af7',
          hover: '#6e7dff',
          glow: 'rgba(91,106,247,0.15)',
        },
        border: {
          DEFAULT: 'rgba(255,255,255,0.07)',
          subtle: 'rgba(255,255,255,0.04)',
          bright: 'rgba(255,255,255,0.14)',
        },
        text: {
          primary: '#f0f0f2',
          muted: '#7a7a85',
          faint: '#44444d',
        },
        success: '#3ecf8e',
      },
      fontFamily: {
        display: ['var(--font-instrument-serif)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      animation: {
        'cursor-blink': 'blink 1s step-end infinite',
        float: 'float 6s ease-in-out infinite',
        'particle-drift': 'drift 20s linear infinite',
        'grid-scan': 'gridScan 8s linear infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        drift: {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100vh) translateX(20px)', opacity: '0' },
        },
        gridScan: {
          '0%': { transform: 'translateY(-20%)' },
          '100%': { transform: 'translateY(120vh)' },
        },
        pulseDot: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(62,207,142,0.7)' },
          '50%': { boxShadow: '0 0 0 8px rgba(62,207,142,0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
      },
    },
  },
  plugins: [],
}
export default config
