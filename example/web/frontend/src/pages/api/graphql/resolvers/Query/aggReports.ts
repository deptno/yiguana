import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'
import {EEntity} from '../../../../../../../../../src/entity/enum'

export const aggReports: GraphQLFieldResolver<any, Context, { entity: EEntity.Post | EEntity.Comment, cursor?: string }> =
  (source, args, context) => {
    console.log('aggReports', args, context.user)

    return context.dataSources.public.aggReports(args)
      .then(response => {
        return {
          ...response,
          items: response.items.map(item => {
            if (item.deleted) {
              item.content = '삭제 처리 되었습니다.'
            }
            return item
          }),
        }
      })
  }
