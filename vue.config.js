// import process from 'process'
const path = require('path')
const WorkerPlugin = require ('worker-plugin') ;

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  outputDir:path.resolve(__dirname, "shopper"),
  publicPath: process.env.PUBLIC_PATH,
  pwa:{
    assetsVersion:process.env.APP_ASSETS_VERSION ? process.env.APP_ASSETS_VERSION : '',
    themeColor:'#f33348',
    iconPaths:{
      appleTouchIcon: 'img/icons/apple-icon-152x152.png',
      msTileImage: 'img/icons/ms-icon-144x144.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
    },
    manifestOptions:{
      theme_color:process.env.VUE_APP_PRIMARY_COLOR,
    }
  },

  configureWebpack:{
    plugins:[
      new WorkerPlugin()
      ],
    resolve: {
      extensions: [
        '.js',
        '.vue',
        '.json'
      ],
      alias: {
        'vue$': process.env.NODE_ENV != 'production'? 'vue/dist/vue.js' : 'vue/dist/vue.min.js',
      }
    },
    module: {
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
