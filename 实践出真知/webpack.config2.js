const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
    	template: './index.html'
    })
  ],
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