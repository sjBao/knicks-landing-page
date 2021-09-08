const path = require("path"); //eslint-disable-line

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  devtool: 'inline-source-map',

  devServer: {
    static: path.resolve(__dirname, 'dist'),
    compress: true,
    open: true,
    port: 9090,
    hot: true,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-modules-typescript-loader',
          {
            loader: 'css-loader',
            options: {
              import: true,
              modules: {
                localIdentName: '__[local]--[hash:base64:5]',
              },
            },
          },
        ],
      },
    ],
  },

  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src/'),
    },
    extensions: ['.tsx', '.ts', '.js', 'jsx'],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
};
