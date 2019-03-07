var path = require('path');

module.exports = {
  mode: 'development',
  entry: { 'Test-EditControl': './tst/Test-EditControl.ts' },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: 'ts-loader', options: { configFile: 'tsconfig.tst.json' } }],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {extensions: [ '.tsx', '.ts', '.js' ]},
  output: {
    path: path.resolve(__dirname, './'),
    filename: '[name].js'
  }
};