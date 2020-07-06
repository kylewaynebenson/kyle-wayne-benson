module.exports = {
  theme: {
    colors: {
      transparent: 'transparent',
      black: '#000000',
      white: '#ffffff',
      purple: '#050066',
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
