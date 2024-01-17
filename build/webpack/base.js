/**
 * Created by Capricorncd.
 * Date: 2020-07-30 17:13
 */
const { resolve } = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin-webpack4')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (isDev, theme) {
  return {
    output: {
      path: resolve(__dirname, '../../dist'),
      filename: '[name].js',
      publicPath: './',
      libraryTarget: 'umd',
      // 複数なEntryの場合、同じLibraryで問題があり
      library: 'FirstGroupUI',
      libraryExport: 'default',
      umdNamedDefine: true,
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '~': resolve('./'),
      },
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            extensions: ['js', 'vue'],
            fix: true,
          },
        },
        {
          test: /\.js$/,
          exclude: '/node_modules/',
          loader: 'babel-loader',
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.md$/,
          use: [
            resolve(__dirname, '../md-loader/end.js'),
            'vue-loader',
            resolve(__dirname, '../md-loader/index.js'),
          ],
        },
        {
          test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
          loader: 'url-loader',
          query: {
            limit: 100000,
            name: './static/[name].[hash:7].[ext]',
          },
        },
        {
          test: /\.s?css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            'sass-loader',
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  resolve(
                    __dirname,
                    `../../src/assets/scss/theme-${theme}.scss`
                  ),
                  resolve(__dirname, '../../src/assets/scss/index.scss'),
                ],
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new ProgressBarPlugin(),
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: resolve(__dirname, '../../index.html'),
        filename: 'index.html',
        vueScript: isDev
          ? ''
          : '<script src="https://cdn.jsdelivr.net/npm/vue"></script>',
        docStyle: isDev
          ? ''
          : '<link rel="stylesheet" id="docCss" href="./doc.blue.css">',
        inject: false,
      }),
    ],
  }
}
