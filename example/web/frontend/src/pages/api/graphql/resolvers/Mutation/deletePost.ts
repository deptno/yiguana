import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const deletePost: GraphQLFieldResolver<any, Context, any> = (source, args, context) => {
  const user = context.getUser(args.user)
  console.log('deletePost', args, user)

  return context.dataSources.private.deletePost({
    data: {
      hk: args.postId
    },
    user
  })
}