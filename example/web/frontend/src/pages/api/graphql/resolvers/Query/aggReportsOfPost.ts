import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'
import {EEntity} from '../../../../../../../../../lib/entity/enum'

export const aggReportsOfPost: GraphQLFieldResolver<any, Context, { entity: EEntity.Post | EEntity.Comment, cursor?: string }> =
  (source, args, context) => {
    const user = context.getUser()
    console.log('aggReportsOfPost', args, user)

    return context.dataSources.public.aggReports({
      cursor: args.cursor,
      entity: 'post' as EEntity.Post,
    })
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
      .catch(() => null)
  }
