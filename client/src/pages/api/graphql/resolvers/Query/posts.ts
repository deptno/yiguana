import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const posts: GraphQLFieldResolver<any, Context, Args> = (source, args, context) => {
  console.log('posts', args, context.user)

  return context.dataSources.public.posts(args)
}

type Args = {
  category?: string
  cursor?: string
}
