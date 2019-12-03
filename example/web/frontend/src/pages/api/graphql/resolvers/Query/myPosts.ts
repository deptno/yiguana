import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const myPosts: GraphQLFieldResolver<any, Context, Args> = (source, args, context) => {
  const user = context.getUser()

  return context.dataSources.private.posts({
    user,
    data: args,
  })
}

type Args = {
  like?: boolean
  cursor?: string
}
