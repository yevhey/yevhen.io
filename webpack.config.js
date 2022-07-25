const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
      main: './src/index.js',
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, './')
    },
    module: {
      rules: [
        {
            test: /\.svg$/,
            loader: 'svg-inline-loader',
        },
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            'css-loader'
          ],
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
    resolve: { extensions: ['.tsx', '.ts', '.css', '.js', '.svg'] },
    devServer: {
      port: 9000,
      publicPath: 'http://localhost:9000/',
      historyApiFallback: true
    }
};
