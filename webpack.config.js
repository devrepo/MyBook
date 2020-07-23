var webpack = require('webpack');
var path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

module.exports = function(env) {
  var debug = false;
  if(env) {
    debug = !!env.debug;
  }

  var commonPlugins = [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new webpack.ProvidePlugin({
      'window.jQuery': 'jquery',
      THREE: 'three',
      'window.THREE' : 'three',
      'window.PDFJS': 'pdfjs-dist',
      'window.html2canvas': 'html2canvas'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'books/pdf/FoxitPdfSdk.pdf', to: 'books/pdf/FoxitPdfSdk.pdf' },
        { from: 'books/images', to: 'books/images' },
        { from: 'node_modules/flip-book/css', to: 'flip-book/css'},
        { from: 'node_modules/flip-book/images', to: 'flip-book/images'},
        { from: 'node_modules/flip-book/sounds', to: 'flip-book/sounds'},
        { from: 'node_modules/flip-book/templates', to: 'flip-book/templates'},
        { from: 'node_modules/flip-book/js/default-book-view.js', to: 'flip-book/js/default-book-view.js'}
      ],
    }),
    new webpack.DefinePlugin({
      GLOBAL_LIBS: {
        jQuery: JSON.stringify(true),
        html2canvas: JSON.stringify(true),
        THREE: JSON.stringify(true),
        PDFJS: JSON.stringify(true),// don't set false. It isn't implemented
      },
      ENVIROMENT: {
        debug: JSON.stringify(debug)
      }
    }),
    new ReplaceInFileWebpackPlugin([{
      dir: 'build/flip-book/js',
      files: ['default-book-view.js'],
      rules: [{
          search: /window\.jQuery/ig,
          replace: 'window.$'
      }]
    }]),
    new HtmlWebpackPlugin({
      template: "index.hbs",
    }),
  ];

  return {
    context: __dirname,
    devtool: debug ? 'inline-sourcemap' : '',
    mode: debug ? "development" : "production",
    entry: {
      main:'./index.js', 
      'main.worker':'./node_modules/pdfjs-dist/build/pdf.worker.js'
    },
    output: {
      path: path.join(__dirname, "build"),
      filename: '[name].js'
    },
    devServer: {
      contentBase: '/build',
      port: 8080,
      inline: true,
      hot: true,
      host: '0.0.0.0',
      progress: true
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: {
            loader: 'raw-loader'
          }
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: false,
                importLoaders: true,
              },
            }
          ],
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'flip-book/fonts/'
              }
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/env"],
              plugins: ["transform-class-properties"],
            },
          },
        }
      ]
    },
    plugins: debug ? commonPlugins : [
      ...commonPlugins,
      new webpack.optimize.OccurrenceOrderPlugin()
    ],
  };
}
