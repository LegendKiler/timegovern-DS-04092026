/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        background: 'var(--bg-base)',
        card: 'var(--bg-card)',
        text: 'var(--text-primary)',
        muted: 'var(--text-muted)',
        border: 'var(--border-light)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        sm: '8px',
      },
      boxShadow: {
        card: '0 8px 24px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.02)',
      },
    },
  },
  plugins: [],
}