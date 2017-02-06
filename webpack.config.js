var path = require('path');
var webpack = require('webpack');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');
var here = require('path-here');
var _ = require('lodash');

var packageJson = require(here('package.json'));
var context = process.env.NODE_ENV || 'development';
var exclude = /node_modules/;

// var configFns = {
//   development: getDevConfig,
//   production: getProdConfig,
//   test: getTestConfig,
//   'test:ci': getTestCIConfig
// };

// var config = configFns[context]();
// addCommonPlugins();

// console.log('building version %s in %s mode', packageJson.version, context);

// module.exports = config;

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
      include: path.join(__dirname, 'src'),
      exclude: exclude
    },
    {
      test: /\.html$/,
      loaders: ['raw'],
      exclude: exclude
    },
    {
      test: /\.css$/,
      loader: 'style!css!sass'
    }]
  }
};