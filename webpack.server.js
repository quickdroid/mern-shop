const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
  target: 'node',
  entry: './server/server.js',
  output: {
    filename: 'server.bundle.js',
    path: path.resolve(__dirname, 'serverBuild')
  },

  externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, config);
