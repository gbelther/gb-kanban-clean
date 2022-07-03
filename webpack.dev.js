const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackCommon = require('./webpack.common');

module.exports = merge(webpackCommon, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    static: {
      directory: './dist',
    },
    devMiddleware: {
      writeToDisk: true,
    },
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './templates/template.dev.html' }),
  ],
});
