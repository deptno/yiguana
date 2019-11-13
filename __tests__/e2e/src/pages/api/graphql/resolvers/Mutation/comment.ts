import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'
import {member_f} from '../../../../../../../__data__/user'

export const comment: GraphQLFieldResolver<any, Context, any> = (source, args, context) => {
  return context.dataSources.public.writeComment({
    data: args,
    user: member_f
  })
}