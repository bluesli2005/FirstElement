/**
 * Created by Capricorncd.
 * Date: 2020-07-30 17:13
 */
const { resolve } = require('path')
const { merge } = require('webpack-merge')
const { getTheme } = require('../helper')
const baseConfig = require('./base')

const rawArgs = process.argv.slice(2)
const theme = getTheme(rawArgs)

module.exports = merge(baseConfig(true, theme), {
  entry: {
    doc: resolve(__dirname, '../../example/index.js'),
  },
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: resolve(__dirname, '../../'),
    publicPath: '/',
    host: '0.0.0.0',
    port: 8081,
    overlay: {
      errors: true,
    },
    hot: true,
  },
})
