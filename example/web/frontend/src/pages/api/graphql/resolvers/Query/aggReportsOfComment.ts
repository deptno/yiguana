import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'
import {EEntity} from '../../../../../../../../../lib/entity/enum'

export const aggReportsOfComment: GraphQLFieldResolver<any, Context, { entity: EEntity.Post | EEntity.Comment, cursor?: string }> =
  (source, args, context) => {
    console.log('aggReportsOfComment', args, context.user)

    return context.dataSources.public.aggReports({
      cursor: args.cursor,
      entity: 'comment' as EEntity.Comment,
    })
      .then((x) => {
        console.log(x)
        return x
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
  }
