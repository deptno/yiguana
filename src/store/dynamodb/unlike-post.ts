import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Post} from '../../entity/post'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'
import {EEntity} from '../../entity/enum'

export async function unlikePost(operator: DynamoDBInput, params: UnlikePostInput) {
  const {dynamodb, tableName} = operator
  const {data} = params
  const {hk} = data
  const response = await dynamodb.update({
    ReturnConsumedCapacity   : 'TOTAL',
    ReturnValues             : 'ALL_NEW',
    TableName                : tableName,
    Key                      : {
      hk,
      rk: EEntity.Post
    },
    UpdateExpression         : 'SET #v = #v - :v',
    ExpressionAttributeNames : {
      '#v': 'likes'
    },
    ExpressionAttributeValues: {
      ':v': 1
    }
  })
  if (response) {
    return response.Attributes as Post
  }
}
export type UnlikePostInput = {
  data: YiguanaDocumentHash
}
