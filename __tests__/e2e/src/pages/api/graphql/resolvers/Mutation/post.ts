import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const post: GraphQLFieldResolver<any, Context> = (source, args, context) => {
  console.log('post', args, context.user)

  const user = context.user ?? args.user
  if (!user) {
    throw new Error('user must be provided')
  }

  return context.dataSources.public.writePost({
    data: args.data,
    user
  })
}
