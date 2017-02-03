var path = require('path');
var webpack = require('webpack');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  devtool: 'eval',
  entry: './app/app.js' ,
  output: {
    path: path.join(__dirname, 'src'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ngAnnotatePlugin({add: true})
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['ng-annotate', 'babel'],
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.css$/,
      loader: 'style!css!sass'
    }]
  }
};