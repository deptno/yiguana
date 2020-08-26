import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const post: GraphQLFieldResolver<any, Context> = (source, args, context) => {
  const user = context.getUser(args.user)
  console.log('post', args, user)

  if (!user) {
    throw new Error('user must be provided')
  }

  return context.dataSources.public.writePost({
    data: args.data,
    user
  })
}
