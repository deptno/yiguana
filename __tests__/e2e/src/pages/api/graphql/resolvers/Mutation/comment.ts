import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const comment: GraphQLFieldResolver<any, Context, any> = (source, args, context) => {
  return context.dataSources.public.writeComment({
    data: args,
    user: context.user
  })
}