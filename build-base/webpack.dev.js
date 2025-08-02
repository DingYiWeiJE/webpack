const { merge } = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')

module.exports = merge(require('./webpack.common.js'), {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      // window.ENV = 'development'
      ENV: JSON.stringify('development')  
    })
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../dist')
    },
    compress: true,
    open: true,
    port: 9000
  }

})