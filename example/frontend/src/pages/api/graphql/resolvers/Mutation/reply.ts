import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'
import {EEntity} from '../../../../../../../../lib/type'
import {Comment} from '../../../../../../../../lib/entity'

export const reply: GraphQLFieldResolver<any, Context, any> = async (source, args, context) => {
  const user = context.getUser(args.user)
  const comment = await context.dataSources.private.get<Comment>({
    user,
    data: {
      hk: args.data.commentId,
      rk: EEntity.Comment
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