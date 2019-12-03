import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const posts: GraphQLFieldResolver<any, Context, Args> = (source, args, context) => {
  return context.dataSources.public.posts({
    data: args
  })
}

type Args = {
  category?: string
  cursor?: string
}
