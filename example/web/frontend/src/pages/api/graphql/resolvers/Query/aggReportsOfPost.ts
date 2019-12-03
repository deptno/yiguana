import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'
import { EEntity } from '../../../../../../../../../lib/type'

export const aggReportsOfPost: GraphQLFieldResolver<any, Context, { entity: EEntity.Post | EEntity.Comment, cursor?: string }> =
  (source, args, context) => {
    const user = context.getUser()
    console.log('aggReportsOfPost', args, user)

    return context.dataSources.public.aggReports({
      ...args,
      entity: 'post' as EEntity.Post,
    })
  }
