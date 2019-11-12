import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const post: GraphQLFieldResolver<any, Context, any> = (source, args, context) => {
  const {nextToken, ...data} = args

  return context.dataSources.yiguana.post({
    data,
    nextToken
  })
}