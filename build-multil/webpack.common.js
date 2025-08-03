const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

module.exports = {
  entry: {
    index: path.join(__dirname, '../', 'src/index.js'),
    other: path.join(__dirname, '../', 'src/other.js')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
      filename: 'index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/other.html'),
      filename: 'other.html',
      chunks: ['other']
    }),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(process.env.NODE_ENV)
    })
  ]
}