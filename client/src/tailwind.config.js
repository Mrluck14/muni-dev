module.exports = {
    purge: [],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [
      require('flowbite/plugin')
    ],
    content: [
      "./node_modules/flowbite/**/*.js"
    ]
  }