const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { devServer } = require('../../实践出真知/webpack.config');

const config = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
  },
  mode: 'development',
  cache: {
    type: 'memory'
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    compress: true,
    port: 9000,
    hot: true,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  },
  performance: {
    hints: 'warning', // 枚举
    hints: 'error', // 性能中抛出错误
    hints: false, // 关闭性能提示
    maxAssetSize: 200000, // 整数类型（单位为字节，默认值是：250000（或者250kb））
    assetFilter: function (assetFilename) {
      // 提供资源文件名的断言函数
      return assetFilename.endsWith('.js') || assetFilename.endsWith('.css');
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets:
          //     ['@babel/preset-env', '@babel/preset-react']
          // }
        }
      },
      {
        test: /\.css$/i,
        use: [
          // MiniCssExtractPlugin.loader, 'css-loader'],
          "style-loader",
          "css-loader"
          // "./loader",
          // "postcss-loader",
          // {
          //   loader: 'less-loader',
          // }
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        type: 'asset'
      }
    ]
  }
}

module.exports = config;
