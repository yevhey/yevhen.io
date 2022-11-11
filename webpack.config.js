const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './')
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-react-loader',
        include: path.resolve(__dirname, './src/images/')
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [new ESLintPlugin()],
  resolve: { extensions: ['.tsx', '.ts', '.css', '.js', '.svg'] },
  devServer: {
    port: 9000,
    publicPath: 'http://localhost:9000/',
    historyApiFallback: true
  }
}
