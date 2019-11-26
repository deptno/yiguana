import {GraphQLResolverMap} from 'apollo-graphql'
import * as Query from './Query'
import * as Mutation from './Mutation'
import {Context} from '../types'

export const resolvers: GraphQLResolverMap<Context> = {
  Query,
  Mutation,
  Comment: {
    post(source, arg, context) {
      return context.dataSources.public.post({
        data: {
          hk: source.postId
        }
      })
    }
  }
}