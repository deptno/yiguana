import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'
import {Comment, Post} from '../../../../../../../../../src/entity'

export const report: GraphQLFieldResolver<any, Context, any> = async (source, args, context) => {
  const user = context.getUser(args.user)
  console.log('report', args, user)

  if (!user) {
    throw new Error('user must be logged in')
  }

  const data: Post | Comment = await context.dataSources.public.get({data: args.data})
  if (!data) {
    throw new Error('not found')
  }

  return context.dataSources.private.report({
    data: {
      data,
      content: args.content,
      createdAt: new Date().toISOString(),
    },
    user
  })
}
