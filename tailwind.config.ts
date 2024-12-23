import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary-color)',
        hovering: 'var(--hovering-color)',
        player1: 'var(--player1-color)',
        player2: 'var(--player2-color)',
        error: 'var(--error-color)',
      },
      backgroundImage: {
        'vertical-gradient':
          'linear-gradient(180deg, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} satisfies Config;
