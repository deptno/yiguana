import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const posts: GraphQLFieldResolver<any, Context, Args> = (source, args, context) => {
  const user = context.getUser()
  console.log('posts', args, user)

  return context.dataSources.public.posts(args)
}

type Args = {
  category?: string
  cursor?: string
}
