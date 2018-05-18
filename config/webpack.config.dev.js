const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const URL = '/';


const clientConfig = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    index: [
      // We ship a few polyfills by default:
      require.resolve('./polyfills'),
      'webpack-hot-middleware/client?timeout=2000',
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
      use: [{
        loader: 'style-loader' // inject style tag in the head part of the document
      }, {
        loader: 'css-loader',
        options: {
          modules: true, // enable css modules
          sourceMap: true,
          localIdentName: '[name]__[local]___[hash:base64:5]' // generate meaningful unique class names
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-cssnext')
          ]
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }
      ]
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
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
      }
    }
    ]
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index.html',
    }),
    new webpack.LoaderOptionsPlugin({ options: {} }), // https://github.com/webpack/webpack/issues/6556
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: "initial",
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0 // This is example is too small to create commons chunks
        },
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true
        }
      }
    }
  }
};


module.exports = clientConfig;
