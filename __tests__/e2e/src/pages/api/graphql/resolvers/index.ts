import {GraphQLResolverMap} from 'apollo-graphql'
import {posts} from './Query'
import {Context} from '../types'

export const resolvers: GraphQLResolverMap<Context> = {
  Query: {
    posts
  }
}