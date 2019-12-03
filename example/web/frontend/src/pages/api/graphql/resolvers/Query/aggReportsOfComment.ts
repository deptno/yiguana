import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'
import {EEntity} from '../../../../../../../../../lib/type'

export const aggReportsOfComment: GraphQLFieldResolver<any, Context, { entity: EEntity.Post | EEntity.Comment, cursor?: string }> =
  (source, args, context) => {
    // FIXME: 인증필요
    const user = context.getUser()
    console.log('aggReportsOfComment', args, user)

    return context.dataSources.public.aggReports({
      ...args,
      entity: 'comment' as EEntity.Comment,
    })
  }
