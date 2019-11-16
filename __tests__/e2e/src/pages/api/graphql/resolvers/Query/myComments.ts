import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'
import {AuthenticationError} from 'apollo-server-errors'

export const myComments: GraphQLFieldResolver<any, Context, Args> = (source, args, context) => {
  console.log('myComments', args, context.user)
  if (!context.user) {
    throw new AuthenticationError('You must be logged in')
  }
  return context.dataSources.private.comments({
    ...args,
    userId: context.user.id
  })
}

type Args = {
  like?: boolean
  cursor?: string
}
