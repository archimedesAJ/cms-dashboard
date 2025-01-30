import { heroui } from '@heroui/react';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              50: '#fef4e4',
              100: '#fce4bd',
              200: '#fad497',
              300: '#f9c571',
              400: '#f7b54a',
              500: '#f5a524',
              600: '#ca881e',
              700: '#9f6b17',
              800: '#744e11',
              900: '#4a320b',
              foreground: '#000',
              DEFAULT: '#f5a524',
            },
          },
        },
      },
    }),
  ],
};
