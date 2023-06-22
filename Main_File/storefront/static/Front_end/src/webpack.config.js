const path = require('path');

module.exports = {
  entry: './myapp/static/myapp/index.jsx', // Entry point of your React app
  output: {
    path: path.resolve(__dirname, 'static/Frontend/src'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
    ],
  },
};
