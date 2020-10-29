require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  plugins: [
    new CopyPlugin([{ from: '../src/views', to: 'views' }]),
  ],
};
