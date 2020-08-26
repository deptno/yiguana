module.exports = () => ({
  env: {
    graphql_endpoint: process.env.graphql_endpoint || '/api/graphql'
  },
  webpack(config) {
    config.module.rules.push({
      exclude: /node_modules/,
      test   : /\.graphql|gql$/,
      use    : [{loader: 'graphql-tag/loader'}]
    })
    return config
  },
})