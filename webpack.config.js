const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|neal-react)/,
        loaders: ['babel']
      },
      {
        test: /\.pug$/,
        loader: 'pug'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }
    ]
  },
  entry: [
    './src/js/app',
    './src/css/main.scss'
  ],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'CONTENTFUL_SPACE': JSON.stringify(process.env.CONTENTFUL_SPACE),
        'CONTENTFUL_ACCESS_TOKEN': JSON.stringify(process.env.CONTENTFUL_ACCESS_TOKEN)
      }
    }),    
    new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {
            warnings: false
        }}),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        'window.Tether': 'tether'
    }),
    new HtmlWebpackPlugin({
      template: 'src/app.pug'
    })
  ]
}