import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const likePost: GraphQLFieldResolver<any, Context, any> = (source, args, context) => {
  const user = context.getUser(args.user)
  console.log('likePost', args, user)

  if (!user) {
    throw new Error('user must be logged in')
  }

  return context.dataSources.private.likePost({
    data: args,
    user,
  })
}