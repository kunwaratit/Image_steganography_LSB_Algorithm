const path = require('path');

module.exports = {
  entry: './myapp/static/myapp/index.jsx', // Entry point of your React app
  output: {a
    path: path.resolve(__dirname, 'myapp/static/myapp'),
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
