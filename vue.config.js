const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  // publicPath: '', // 打包文件相对路径
  devServer: {
    // port: 8081,
    proxy: {
      '/api': {
        // 代理请求的目标地址
        // target: 'http://192.168.1.192:8083/v2', //李斌
        target: 'http://192.168.1.144:8083/v2', //吕峰
        // target: 'http://192.168.1.131:8888/v2', //swagger测试
        // target: 'http://192.168.1.160:8083/v2', //石李
        // target: 'https://mg-uat.qifenqian.com/v2', //uat测试
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        secure: false
      }
    }
  },
  lintOnSave: false,
  configureWebpack: (config) => {// eslint-disable-line
    if (process.env.NODE_ENV === 'production') {
      return {
        optimization: {
          minimizer: [
            new TerserPlugin({
              sourceMap: false,
              terserOptions: {
                compress: {
                  drop_console: true
                }
              }
            })
          ]
        }
      }
    }
  }
}