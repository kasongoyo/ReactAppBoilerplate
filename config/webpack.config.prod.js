const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const URL = '<production-url>/';
// const URL = 'http://127.0.0.1:3000/';

const clientConfig = {
  mode: 'production',
  devtool: 'eval',
  entry: {
    index: [
      // We ship a few polyfills by default:
      require.resolve('./polyfills'),
      path.resolve(__dirname, '..', 'src', 'index.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, '..', 'build'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    publicPath: URL,
    pathinfo: true
  },

  resolve: {
    extensions: ['.css', '.js', '.jsx'],
    modules: [
      __dirname,
      path.resolve(__dirname, '..', 'src', 'components'),
      'node_modules',
      'bower_components'
    ],
    alias: {
      API: path.resolve(__dirname, '../src/api/'),
      actions: path.resolve(__dirname, '../src/actions'),
      reducers: path.resolve(__dirname, '../src/reducers'),
      utils: path.resolve(__dirname, '../src/utils')
    }
  },
  /* eslint indent:1 */
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader!eslint-loader'
    },
    {
      test: /\.scss$/,
      exclude: /(node_modules|bower_components)/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            plugins: () => [
              require('postcss-flexbugs-fixes'),
              require('postcss-cssnext')
              , require('css-mqpacker'), require('cssnano')]
          }
        }, 'sass-loader'
      ]
    },
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            plugins: () => [
              require('postcss-cssnext'),
              require('css-mqpacker'),
              require('cssnano')({
                discardComments: {
                  removeAll: true // remove all comments even /** comments */
                }
              })]
          }
        }
      ]
    },
    {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?name=[hash]-[name].[ext]&limit=1024'
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader',
      query: {
        name: 'fonts/[name].[ext]',
        publicPath: `${URL}dist/`,
      }
    }
    ]
  },
  /*eslint indent:0 */
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index.html',
    }),
    new webpack.LoaderOptionsPlugin({ options: {} }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0 // This is example is too small to create commons chunks
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        },
        styles: {
          test: /\.css$/,
          chunks: 'all',
          name: 'styles',
          enforce: true
        }
      }
    }
  }
};


module.exports = clientConfig;
