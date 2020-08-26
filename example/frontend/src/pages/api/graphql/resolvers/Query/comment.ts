import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const comment: GraphQLFieldResolver<any, Context, any> = (source, args, context) => {
  const user = context.getUser()
  console.log('comment', args, user)

  const {cursor, ...data} = args

  return context.dataSources.public.comment({
    data: {
      hk: args.hk,
    }
  })
}