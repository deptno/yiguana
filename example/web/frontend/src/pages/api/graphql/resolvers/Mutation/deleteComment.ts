import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const deleteComment: GraphQLFieldResolver<any, Context, any> = (source, args, context) => {
  const user = context.getUser(args.user)
  console.log('deleteComment', args, user)

  // FIXME: 인증

  return context.dataSources.private.deleteComment({
    data: {
      hk: args.commentId
    }
  })
}