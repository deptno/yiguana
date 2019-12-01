import {DynamoDBInput} from '../../entity/input/dynamodb'
import {reportsByUser, ReportByUserInput} from './reports-by-user'
import {Post} from '../../entity/post'
import {EEntity} from '../../type'

export function postsByUserReport(operator: DynamoDBInput, params: PostsByUserReportInput) {
  return reportsByUser(operator, {...params, entity: EEntity.Post})
    .then(response => {
      return {
        ...response,
        items: response.items.map(t => t.data as Post),
      }
    })
}
export type PostsByUserReportInput = Omit<ReportByUserInput, 'entity'>
