const path = require('path')
const slsw = require('serverless-webpack')

module.exports = {
  mode     : slsw.lib.webpack.isLocal
    ? 'development'
    : 'production',
  entry    : slsw.lib.entries,
  externals: ['aws-sdk'],
  resolve  : {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  target   : 'node',
  module   : {
    rules: [
      {
        test   : /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader : 'babel-loader',
      },
      {
        type: 'javascript/auto',
        test: /\.mjs$/,
        use : []
      },
    ],
  },
}
