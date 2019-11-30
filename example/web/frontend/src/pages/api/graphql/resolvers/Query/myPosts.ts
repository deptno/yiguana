import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'
import {AuthenticationError} from 'apollo-server-errors'

export const myPosts: GraphQLFieldResolver<any, Context, Args> = (source, args, context) => {
  const user = context.getUser()

  console.log('myPosts', args, user)

  if (!('id' in user)) {
    throw new AuthenticationError('You must be logged in')
  }

  // FIXME: userId 대신 user 를 통일해서 받고 처리되어야한다
  return context.dataSources.private.posts({
    ...args,
    userId: user.id,
  })
}

type Args = {
  like?: boolean
  cursor?: string
}
