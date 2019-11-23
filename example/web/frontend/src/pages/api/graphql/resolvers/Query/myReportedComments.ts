import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'
import {AuthenticationError} from 'apollo-server-errors'

export const myReportedComments: GraphQLFieldResolver<any, Context, Args> = (source, args, context) => {
  console.log('myReportedComments', args, context.user)
  if (!context.user) {
    throw new AuthenticationError('You must be logged in')
  }
  return context.dataSources.private.comments({
    ...args,
    userId: context.user.id,
    report: true,
  })
}

type Args = {
  like?: boolean
  cursor?: string
}