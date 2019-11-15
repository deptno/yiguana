import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const deleteComment: GraphQLFieldResolver<any, Context, any> = (source, args, context) => {
  return context.dataSources.private.deleteComment({
    hk: args.commentId
  })
}