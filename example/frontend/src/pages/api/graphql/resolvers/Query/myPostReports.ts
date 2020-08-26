import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'
import {AuthenticationError} from 'apollo-server-errors'
import {EEntity} from '../../../../../../../../lib/type'

export const myPostReports: GraphQLFieldResolver<any, Context, Args> = (source, args, context) => {
  const user = context.getUser()

  console.log('myPostReports', args, user)

  if (!('id' in user)) {
    throw new AuthenticationError('You must be logged in')
  }

  return context.dataSources.private.reports({
    user,
    data: {
      entity: EEntity.Post,
      cursor: args.cursor,
    },
  })
    .then(x => {
      console.table(x.items)
      return x
    })
}

type Args = {
  cursor?: string
}
