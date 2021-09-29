module.exports = {
  purge: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        '-1': '-1'
      },
      flexGrow: {
        5: '5'
      },
      maxHeight: {
        'screen-menu': 'calc(100vh - 3.5rem)',
        modal: 'calc(100vh - 160px)'
      },
      transitionProperty: {
        position: 'right, left, top, bottom, margin, padding'
      }
    }
  },
  variants: {
    extend: {
      margin: ['last'],
      fontWeight: ['last'],
      textColor: ['last']
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar')
  ]
}
