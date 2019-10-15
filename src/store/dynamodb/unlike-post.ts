import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Post} from '../../entity/post'

export async function unlikePost(operator: DynamoDBInput, params: UnlikePostInput) {
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
    UpdateExpression         : 'SET #v = #v - :v',
    ExpressionAttributeNames : {
      '#v': 'likes'
    },
    ExpressionAttributeValues: {
      ':v': 1
    }
  })
  if (response) {
    if (response.ConsumedCapacity) {
      const wcu = response.ConsumedCapacity.CapacityUnits
      console.log({wcu})
    }
    return response.Attributes as Post
  }
}
export type UnlikePostInput = {
  post: Post
}
