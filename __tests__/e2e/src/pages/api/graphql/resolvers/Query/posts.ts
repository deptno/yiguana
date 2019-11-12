import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const posts: GraphQLFieldResolver<any, Context> = (source, args, context) => {
  return context.dataSources.yiguana.posts(args)
}