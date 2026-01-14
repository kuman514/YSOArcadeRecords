import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

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
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.drag-none': {
          '-webkit-user-drag': 'none',
          '-khtml-user-drag': 'none',
          '-moz-user-drag': 'none',
          '-o-user-drag': 'none',
          'user-drag': 'none',
        },
        '.retro-rounded': {
          'border-style': 'solid',
          'border-width': '4px',
          'border-color': 'var(--foreground)',
          outline: 'none',
          'border-image-slice': '2',
          'border-image-width': '1',
          'border-image-outset': '0',
          'border-image-source': 'var(--retro-border-1-image-source)',
        },
        '.retro-rounded-2': {
          'border-style': 'solid',
          'border-width': '4px',
          'border-color': 'var(--foreground)',
          'border-radius': '20px',
          outline: 'none',
          'border-image-slice': '4',
          'border-image-width': '2',
          'border-image-outset': '0',
          'border-image-source': 'var(--retro-border-2-image-source)',
        },
        '.retro-rounded-2-darkonly': {
          'border-style': 'solid',
          'border-width': '4px',
          'border-color': '#ffffff',
          'border-radius': '20px',
          outline: 'none',
          'border-image-slice': '4',
          'border-image-width': '2',
          'border-image-outset': '0',
          'border-image-source': 'var(--retro-border-2-image-source-dark)',
        },
      });
    }),
  ],
} satisfies Config;
