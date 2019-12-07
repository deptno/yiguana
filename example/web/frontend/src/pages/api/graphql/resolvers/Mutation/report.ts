import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'
import {Comment, Post} from '../../../../../../../../../lib/entity'

export const report: GraphQLFieldResolver<any, Context, any> = async (source, args, context) => {
  const user = context.getUser(args.user)
  const data: Post | Comment = await context.dataSources.private.get({
    user,
    data: args.data,
  })

  if (!data) {
    throw new Error('not found')
  }

  return context.dataSources.private.report({
    user,
    data: {
      data,
      content: args.content,
      createdAt: new Date().toISOString(),
    },
  })
}
