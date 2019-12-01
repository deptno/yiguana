import {DynamoDBInput} from '../../entity/input/dynamodb'
import {_reportsByUser, QueryByUserReport} from './_reports-by-user'
import {Post} from '../../entity/post'
import {EEntity} from '../../type'

export function postsByUserReport(operator: DynamoDBInput, params: PostsByUserReportInput) {
  return _reportsByUser<Post>(operator, {...params, entity: EEntity.Post})
    .then(response => {
      return {
        ...response,
        items: response.items.map(t => t.data as Post),
      }
    })
}
export type PostsByUserReportInput = Omit<QueryByUserReport<EEntity.Post>, 'entity'>
