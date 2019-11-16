import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const reply: GraphQLFieldResolver<any, Context, any> = (source, args, context) => {
  console.log('reply', args, context.user)

  const user = args.user ?? context.user
  if (!user) {
    throw new Error('user must be provided')
  }

  return context.dataSources.public.writeReply({
    data: args.data,
    user,
  })
}