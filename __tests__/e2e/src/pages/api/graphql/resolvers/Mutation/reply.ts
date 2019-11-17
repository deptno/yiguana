import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const reply: GraphQLFieldResolver<any, Context, any> = async (source, args, context) => {
  console.log('reply', args, context.user)

  const user = args.user ?? context.user
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
      comment
    },
    user,
  })
}