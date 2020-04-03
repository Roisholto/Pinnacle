// import process from 'process'
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  outputDir:path.resolve(__dirname, "shopper"),
  publicPath: process.env.NODE_ENV !== 'development'
      ? '/shopper/'
      : '/',
 pwa:{
     themeColor:'#f33348',
     manifestOptions:{
         theme_color:'#f33348'
     }
 },
  configureWebpack: {
    resolve: {
      'extensions': [
        '.js',
        '.vue',
        '.json'
      ],
      'alias': {
        'vue$': process.env.NODE_ENV != 'production'? 'vue/dist/vue.js' : 'vue/dist/vue.min.js',
      }
    },
    'module': {
      'rules': [
        {
        test:require.resolve("jquery"),
        use: [
            {
              'loader': 'expose-loader',
              'options': '$'
            },
            {
              'loader': 'expose-loader',
              'options': 'jQuery'
            }
          ]
      }
     ]
    }
  },
  'lintOnSave': false,
  'devServer': {
    'port': 8082
  },
  'transpileDependencies': [
    'vuetify'
  ]
}
