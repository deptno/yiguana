import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Post} from '../../entity/post'

export async function likePost(operator: DynamoDBInput, params: LikePostInput) {
  const {dynamodb, tableName} = operator
  const {post} = params
  const {hk, rk} = post
  const response = await dynamodb.update({
    ReturnConsumedCapacity   : 'TOTAL',
    ReturnValues             : 'ALL_NEW',
    TableName                : tableName,
    Key                      : {
      hk,
      rk
    },
    UpdateExpression         : 'SET #v = #v + :v',
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
export type LikePostInput = {
  post: Post
}
