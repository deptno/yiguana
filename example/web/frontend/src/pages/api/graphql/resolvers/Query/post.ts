import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const post: GraphQLFieldResolver<any, Context, any> = (source, args, context) => {
  console.log('post', args, context.user)

  const {cursor, ...data} = args

  return context.dataSources.public.post({
    data,
  })
}