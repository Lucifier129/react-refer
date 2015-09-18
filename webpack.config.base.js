var webpack = require('webpack');

module.exports = {
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
    ]
  },
  output: {
    library: 'ReactRefer',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js'],
    alias: {
      refer: __dirname + '/refer.js'
    }
  }
};
