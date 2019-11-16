import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const likeComment: GraphQLFieldResolver<any, Context, any> = (source, args, context) => {
  console.log(args)
  return context.dataSources.private.likeComment({
    data: args,
    user: context.user
  })
}