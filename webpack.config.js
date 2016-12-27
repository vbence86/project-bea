const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|common)/,
        loaders: ['babel']
      },
      {
        test: /\.pug$/,
        loader: 'pug'
      },    
    ]
  },
  entry: './src/js/index',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.pug'
    })
  ]
}