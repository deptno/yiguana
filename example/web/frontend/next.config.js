module.exports = () => ({
  env: {
    graphql_endpoint: process.env.graphql_endpoint || '/api/graphql'
  }
})