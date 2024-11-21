/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit', // Enable JIT mode
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
     extend: {
        colors:{
           'background': '#1B1C37',
           'primary': '#2E9CCA',
           'secondary': '#f8fafc',
           'primarydark': '#29648A',
           'primarylight':'#cae1fa',
           brand: '#2E9CCA',
           dark: '#222222',
           blue: '#4086F4',
           yellow: '#FFB60A',
           paragraph: '#666666',
           text: '#444444',
           primaryBg: '#1B1C37',
           secondaryBg: '#F7F8FC',
           lightBlue: '#eff0f6',
           red: '#ef476f',
           lightRed: '#FFE7DB',
           transparent: 'transparent',
           white: '#ffffff',
           fontprimary: '#f8fafc',
           fontsecondary: '#AAABB8',
           ex1: '#29648A',
           ex2:'#444362',
           ex3:'#003c4c',
           logcon:'#464866'
        },
        width: {
           sm: '24rem',
           md: '28rem',
           lg: '32rem',
           xl: '36rem',
           '2xl': '48rem',
           '3xl': '56rem',
           '4xl': '64rem',
         },
     },
     fontFamily: {
        volkhov: ['Volkhov', 'Poppins', 'serif'],
        poppins: ['Poppins', 'serif'],
      },
  },
  plugins: [],
};
