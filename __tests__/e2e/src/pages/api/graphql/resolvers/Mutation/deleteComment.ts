import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const deleteComment: GraphQLFieldResolver<any, Context, any> = (source, args, context) => {
  // TODO: 여기서 인증 처리할 것인지
  return context.dataSources.private.deleteComment({
    hk: args.commentId
  })
}