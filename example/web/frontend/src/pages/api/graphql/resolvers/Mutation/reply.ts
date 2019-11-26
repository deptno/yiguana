import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const reply: GraphQLFieldResolver<any, Context, any> = async (source, args, context) => {
  const user = context.getUser(args.user)
  console.log('reply', args, user)

  if (!user) {
    throw new Error('user must be provided')
  }

  const comment = await context.dataSources.public.get({
    data: {
      hk: args.data.commentId,
      rk: 'comment'
    },
  })

  return context.dataSources.public.writeReply({
    data: {
      content: args.data.content,
      createdAt: new Date().toISOString(),
      refUserName: args.data.refUserName,
      comment,
    },
    user,
  })
}