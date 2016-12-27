const webpack = require('webpack');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|common)/,
        loaders: ['babel']
      }      
    ]
  },
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: './dist'
  }
}