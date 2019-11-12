import {sayHello} from './Query/sayHello'
import {GraphQLResolverMap} from 'apollo-graphql'

export const resolvers: GraphQLResolverMap = {
  Query: {
    sayHello
  }
}