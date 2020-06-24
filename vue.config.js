const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  // publicPath: '', // 打包文件相对路径
  devServer: {
    // port: 8081,
    proxy: {
      '/api': {
        // 代理请求的目标地址

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