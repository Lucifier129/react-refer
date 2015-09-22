var webpack = require('webpack');
var path = require('path');
var root = path.dirname(path.dirname(__dirname))

module.exports = {
    entry: {
        simple: './src'
    },
    output: {
        path: 'dist',
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader?stage=0&optional[]=runtime',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['', '.js'],
        alias: {
            'refer': root + '/vendor/refer.js',
            'refer-logger': root + '/vendor/logger.js',
            'react-refer': root + '/dist/react-refer.js'
        }
    }
};
