/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--theme-primary)',
        secondary: 'var(--theme-secondary)',
        tertiary: 'var(--theme-tertiary)',
        quaternary: 'var(--theme-theme-quaternary)',
        'text-base': 'var(--text-base)',
        accent: 'var(--accent)',
       'accent-secondary': 'var(--accent-secondary)',
      },


    },
  },
  plugins: ['@tailwind/utilities'],
};
