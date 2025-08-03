const { merge } = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')

module.exports = merge(require('./webpack.common.js'), {
  mode: 'production',
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
  }
})