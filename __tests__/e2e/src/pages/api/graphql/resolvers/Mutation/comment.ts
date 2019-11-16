import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const comment: GraphQLFieldResolver<any, Context, any> = (source, args, context) => {
  console.log('comment', args, context.user)

  const user = args.user ?? context.user
  if (!user) {
    throw new Error('user must be provided')
  }

  return context.dataSources.public.writeComment({
    data: args.data,
    user,
  })
}