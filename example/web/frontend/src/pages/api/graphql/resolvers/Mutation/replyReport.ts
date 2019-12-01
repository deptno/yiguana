import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const replyReport: GraphQLFieldResolver<any, Context, any> = async (source, args, context) => {
  const user = context.getUser(args.user)
  console.log('replyReport', args, user)

  if (!user) {
    throw new Error('user must be provided')
  }

  return context.dataSources.public.replyReport(args)
}