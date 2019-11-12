import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntity} from '../../entity/enum'
import {Comment} from '../../entity/comment'
import {_reportsByUser, QueryByUserReport} from './_reports-by-user'

export function commentsByUserReport(operator: DynamoDBInput, params: CommentsByUserReportInput) {
  return _reportsByUser<Comment>(operator, {...params, entity: EEntity.Comment})
    .then(response => {
      return {
        ...response,
        items: response.items.map(t => t.data as Comment)
      }
    })
}
export type CommentsByUserReportInput = Omit<QueryByUserReport<EEntity.Comment>, 'entity'>
