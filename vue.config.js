// import process from 'process'
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  outputDir:path.resolve(__dirname, "shopper"),
  publicPath: process.env.PUBLIC_PATH,
 pwa:{
   themeColor:'#f33348',
   iconPaths:{
     appleTouchIcon: 'img/icons/apple-icon-152x152.png',
     // maskIcon: 'img/icons/safari-pinned-tab.svg',
     msTileImage: 'img/icons/ms-icon-144x144.png'
   },
   manifestOptions:{
    theme_color:process.env.VUE_APP_PRIMARY_COLOR,
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
