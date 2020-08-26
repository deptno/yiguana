import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'
import {EEntity} from '../../../../../../../../lib/type'

export const aggReportsOfComment: GraphQLFieldResolver<any, Context, { cursor?: string }> = (source, args, context) => {
  const user = context.getUser()

  return context.dataSources.public.aggReports({
    user,
    data: {
      ...args,
      entity: 'comment' as EEntity.Comment,
    },
  })
}

