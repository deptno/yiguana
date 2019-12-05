import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'
import { EEntity } from '../../../../../../../../../lib/type'

export const aggReportsOfPost: GraphQLFieldResolver<any, Context, { entity: EEntity.Post | EEntity.Comment, cursor?: string }> =
  (source, args, context) => {
    const user = context.getUser()

    return context.dataSources.public.aggReports({
      user,
      data: {
        ...args,
        entity: 'post' as EEntity.Post,
      }
    })
  }
