import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Comment} from '../../entity/comment'
import {reportsByUser, ReportByUserInput} from './reports-by-user'
import {EEntity} from '../../type'

export function commentsByUserReport(operator: DynamoDBInput, params: CommentsByUserReportInput) {
  return reportsByUser(operator, {...params, entity: EEntity.Comment})
    .then(response => {
      return {
        ...response,
        items: response.items.map(t => t.data as Comment)
      }
    })
}
export type CommentsByUserReportInput = Omit<ReportByUserInput, 'entity'> & {limit?: number}
