module.exports = {
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      'xxl': '1500px',

      'xxxl': '2000px',

      'xxxxl': '2500px',
    },
    colors: {
      transparent: 'transparent',
      black: '#0E0A0C',
      white: '#ffffff',
      purple: '#9B51E0',
      darkblue: '#393F5C',
      orange: '#EE724C',
      tan: '#F6F5EF',
      periwinkle: '#7798F8',
      green: '#566B10',
      pink: '#EC6DEA',
      grey: '#C4C4C4',
    },
    stroke: theme => ({
      'purple-black': theme('colors.purple.black'),
      'pink': theme('colors.pink'),
    }),
    gradients: theme => ({
      'gray-lightgray': [theme('colors.gray.200'), theme('colors.gray.300')],
    }),
    fontFamily: {
      geordi: ['VC Geordi', 'sans-serif'],
      talmage: ['VC Talmage ExtraCondensed', 'serif'],
    },
    extend: {
      colors: {
        gray: {
          '100': '#f5f5f5',
          '200': '#eeeeee',
          '300': '#e0e0e0',
          '400': '#bdbdbd',
          '500': '#9e9e9e',
          '600': '#757575',
          '700': '#616161',
          '800': '#424242',
          '900': '#212121',
        }
      }
    }
  },
  variants: {},
  plugins: []
}
