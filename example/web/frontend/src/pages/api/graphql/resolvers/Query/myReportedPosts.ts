import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'
import {AuthenticationError} from 'apollo-server-errors'

export const myReportedPosts: GraphQLFieldResolver<any, Context, Args> = (source, args, context) => {
  const user = context.getUser()

  console.log('myReportedPosts', args, user)

  if (!('id' in user)) {
    throw new AuthenticationError('You must be logged in')
  }

  return context.dataSources.private.posts({
    ...args,
    userId: user.id,
    report: true
  })
}

type Args = {
  like?: boolean
  cursor?: string
}
