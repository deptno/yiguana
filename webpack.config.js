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
    alias: {
      deepmerge$: 'deepmerge/dist/umd.js',
    }
  },
  output   : {
    libraryTarget: 'commonjs',
    path         : path.join(__dirname, '.webpack'),
    filename     : '[name].js',
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
  optimization: {
    minimize: false
  }
}
