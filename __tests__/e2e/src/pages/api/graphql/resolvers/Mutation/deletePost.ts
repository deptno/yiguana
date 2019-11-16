import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const deletePost: GraphQLFieldResolver<any, Context, any> = (source, args, context) => {
  console.log(args)
  return context.dataSources.private.deletePost({
    data: {
      hk: args.postId
    },
    user: context.user
  })
}