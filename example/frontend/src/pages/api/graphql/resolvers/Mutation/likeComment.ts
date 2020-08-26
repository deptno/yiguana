import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const likeComment: GraphQLFieldResolver<any, Context, any> = (source, args, context) => {
  const user = context.getUser(args.user)
  console.log('likeComment', args, user)

  return context.dataSources.private.likeComment({
    data: args,
    user
  })
}