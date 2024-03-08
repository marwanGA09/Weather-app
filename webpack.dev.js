const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { default: merge } = require('webpack-merge');
const webpackCommon = require('./webpack.common');

module.exports = merge(webpackCommon, {
  mode: 'development',
  devtool: 'inline-source-map', // Provides source maps for better debugging experience

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: path.join(__dirname, 'src'),
    compress: true,
    port: 9000,
    hot: true, // Enables hot module replacement (HMR)
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'], // Inject CSS into the DOM
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'], // Inject CSS into the DOM
      },
    ],
  },
});
