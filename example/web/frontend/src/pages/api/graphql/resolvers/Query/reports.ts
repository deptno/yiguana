import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const reports: GraphQLFieldResolver<any, Context> =
  (source, args, context) => {
    const user = context.getUser()
    console.log('reports', args, user)

    return context.dataSources.public.reports({
      data: {
        hk: args.hk,
        rk: args.rk,
      },
    })
  }
