const path = require('path')
const isProd = process.env.NODE_ENV === 'production'

function resolve () {
  return path.join(__dirname, ...Array.from(arguments))
}

const outputDir = isProd && process.env.OUTPUT_DIR ? resolve(process.env.OUTPUT_DIR) : undefined

module.exports = {
  baseUrl: isProd ? '/static' : '/',
  outputDir,
  chainWebpack: config => {
    // 添加别名
    const index = './src'
    config.resolve.alias
      .set('store', resolve(index, 'store'))
      .set('router', resolve(index, 'router'))
      .set('lib', resolve(index, 'lib'))
      .set('views', resolve(index, 'views'))
      .set('components', resolve(index, 'components'))
      .set('constant', resolve(index, 'constant'))
      .set('assets', resolve(index, 'assets'))
      .set('@', resolve(index))

    if (isProd) {
      /* 图片压缩 */
      config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .tap(() => {
          return {
            mozjpeg: {
              progressive: true,
              quality: 65
            },
            // optipng.enabled: false will disable optipng
            optipng: {
              enabled: false
            },
            pngquant: {
              quality: '65-90',
              speed: 4
            }
          }
        })
    }
  },
  devServer: {
    open: false,
    host: '0.0.0.0',
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: `http://api-test.cm.com`,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  transpileDependencies: [
    'vuex-persist',
    'resize-detector'
  ],
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/assets/styles/common/index.scss')
      ]
    }
  },

  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,
  css: undefined,
  lintOnSave: undefined
}
