const { merge } = require('webpack-merge')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(require('./webpack.common.js'), {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            outputPath: 'images',
          }
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style/[name].[contenthash:8].css',
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({extractComments: false}),
      new CssMinimizerPlugin()
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: 1,
          minChunks: 1,
          minSize: 0,
        },
        common: {
          name: 'common',
          priority: 0,
          minSize: 0,
          reuseExistingChunk: true,
          minChunks: 2,
        }
      }
    }
  },
})