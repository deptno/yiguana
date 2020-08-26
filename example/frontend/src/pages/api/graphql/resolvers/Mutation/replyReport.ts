import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const replyReport: GraphQLFieldResolver<any, Context, any> = async (source, args, context) => {
  const user = context.getUser(args.user)
  const {hk, ...data} = args

  return context.dataSources.public.replyReport({
    data: {
      ...data,
      data: {
        hk
      },
    },
    user
  })
}