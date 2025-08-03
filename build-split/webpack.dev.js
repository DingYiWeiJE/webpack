const { merge } = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')

module.exports = merge(require('./webpack.common.js'), {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: 'file-loader'
      }
    ]
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../dist')
    },
    compress: true, // 启动gzip压缩
    open: true,
    port: 9000,
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:3000'
      },
      {
        context: ['/api2'],
        target: 'http://localhost:3000',
        pathRewrite: { '^/api2': '' }
      }
    ],
  }

})