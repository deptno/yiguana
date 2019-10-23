import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Post} from '../../entity/post'
import {EEntity} from '../../entity/enum'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'

export async function viewPost(operator: DynamoDBInput, params: ViewPostInput) {
  const {dynamodb, tableName} = operator
  const {data} = params
  const {hk} = data
  const response = await dynamodb.update({
    ReturnConsumedCapacity: 'TOTAL',
    ReturnValues: 'ALL_NEW',
    TableName: tableName,
    Key: {
      hk,
      rk: EEntity.Post,
    },
    UpdateExpression: 'SET #v = #v + :v',
    ExpressionAttributeNames: {
      '#v': 'views',
    },
    ExpressionAttributeValues: {
      ':v': 1,
    },
  })
  if (response) {
    return response.Attributes as Post
  }
}
export type ViewPostInput = {
  data: YiguanaDocumentHash
}
