import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0d1b2a',
        secondary: '#1b263b',
        accent: '#415a77',
        light: '#778da9',
        background: '#e0e1dd',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
