const path = require('path');

module.exports = {
    entry: {
      main: ['./src/App.js', './src/Home.js', './src/PokemonProfile.js']
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, './')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    },
    resolve: { extensions: ['.js'] },
    devServer: {
      port: 9000,
      publicPath: 'http://localhost:9000/',
      historyApiFallback: true
    }
};
