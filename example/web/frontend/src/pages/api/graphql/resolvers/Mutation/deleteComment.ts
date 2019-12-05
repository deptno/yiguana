import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const deleteComment: GraphQLFieldResolver<any, Context, any> = (source, args, context) => {
  const user = context.getUser(args.user)

  return context.dataSources.private.deleteComment({
    user,
    data: {
      hk: args.commentId
    }
  })
}