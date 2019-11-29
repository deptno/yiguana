import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const comments: GraphQLFieldResolver<{postId}, Context> = (source, args, context) => {
  const user = context.getUser()
  console.log('comments', args, user)

  return context.dataSources.public.comments(args)
}