export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#f0f4fa',
          100: '#d9e4f3',
          200: '#b3c9e7',
          300: '#7fa3d2',
          400: '#4d7dbc',
          500: '#2d5fa0',
          600: '#1e4a85',
          700: '#16386a',
          800: '#0f2750',
          900: '#091838',
          950: '#050e22',
        },
        slate: {
          850: '#1a2332',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
