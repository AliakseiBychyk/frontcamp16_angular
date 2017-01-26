var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, 'public'),
  devtool: 'eval',
  entry: './js/index.js' ,
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['ng-annotate', 'babel'],
      include: path.join(__dirname, 'public')
    }]
  }
};