import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const posts: GraphQLFieldResolver<any, Context, Args> = (source, args, context) => {
  console.log(args)
  return context.dataSources.yiguana.posts(args)
}

type Args = {
  category?: string
  nextToken?: string
}
