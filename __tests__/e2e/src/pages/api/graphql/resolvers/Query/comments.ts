import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const comments: GraphQLFieldResolver<{postId}, Context> = (source, args, context) => {
  return context.dataSources.public.comments(args)
}