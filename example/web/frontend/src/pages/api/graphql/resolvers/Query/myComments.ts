import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const myComments: GraphQLFieldResolver<any, Context, Args> = (source, args, context) => {
  const user = context.getUser()

  return context.dataSources.private.comments({
    user,
    data: args,
  })
}

type Args = {
  like?: boolean
  cursor?: string
}
