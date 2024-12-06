const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpckPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpckPlugin({
    	template: './index.html'
    })
  ],
  mode: 'plofuction',
  devServer: {
    static: {
      directory: path.join(__dirname, 'publics'),
    },
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',

          'css-loader',

          // 'less-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.js$/i,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}