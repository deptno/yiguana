import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const likePost: GraphQLFieldResolver<any, Context, any> = (source, args, context) => {
  console.log('likePost', args, context.user)

  return context.dataSources.private.likePost({
    data: args,
    user: context.user
  })
}