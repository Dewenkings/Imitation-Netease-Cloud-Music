const isProd = process.env.NODE_ENV === 'production'
let externals = {}
let cdn = { css: [], js: [] }

const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

var path = require('path')

if (isProd) {
  externals = {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios',
    'element-ui': 'ELEMENT'
  }

  cdn = {
    css: ['https://unpkg.com/element-ui/lib/theme-chalk/index.css'],
    js: [
      'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js',
      'https://unpkg.com/vue-router@3.2.0/dist/vue-router.js',
      'https://unpkg.com/vuex@3.4.0',
      'https://cdn.staticfile.org/axios/0.21.1/axios.min.js',
      'https://unpkg.com/element-ui/lib/index.js'
    ]
  }
}

module.exports = {

  // 输出文件目录
  outputDir: path.resolve(__dirname, 'server/dist'),
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        network: '@/network',
        views: '@/views',
        plugins: '@/plugins'
      }
    },
    externals: externals,
    // 开启gzip
    plugins: [
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'), // 匹配文件名
        threshold: 10240, // 对10K以上的数据进行压缩
        minRatio: 0.8,
        deleteOriginalAssets: false // 是否删除源文件
      })
    ]
  },
  // 自定义打包
  chainWebpack: config => {
    // 发布模式
    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      return args
    })
  },
  devServer: {
    proxy: {
      '/api': {
        // target: 'https://www.codeman.store',
        target: 'http://www.codeman.ink:3000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      m7: {
        target: 'http://m7.music.126.net',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/m7': ''
        }
      },
      m701: {
        target: 'http://m701.music.126.net',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/m701': ''
        }
      },
      m8: {
        target: 'http://m8.music.126.net',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/m8': ''
        }
      },
      m801: {
        target: 'http://m801.music.126.net',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/m801': ''
        }
      }
    }
  }
}
