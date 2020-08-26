import {ApolloServer, makeExecutableSchema} from 'apollo-server-micro'
import {typeDefs} from './typeDefs'
import {resolvers} from './resolvers'
import {context} from './context'
import {dataSources} from './dataSource'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
const apolloServer = new ApolloServer({
  schema,
  context,
  dataSources
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({
  path: '/api/graphql',
})
