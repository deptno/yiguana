import {ApolloServer, makeExecutableSchema} from 'apollo-server-lambda'
import {typeDefs} from '../../frontend/src/pages/api/graphql/typeDefs'
import {resolvers} from '../../frontend/src/pages/api/graphql/resolvers'
import {context} from '../../frontend/src/pages/api/graphql/context'
import {dataSources} from '../../frontend/src/pages/api/graphql/dataSource'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
const apolloServer = new ApolloServer({
  schema,
  context,
  dataSources,
  playground: true,
  introspection: true,
})

export default apolloServer.createHandler({
  cors: {
    origin: '*',
    credentials: true
  }
})
