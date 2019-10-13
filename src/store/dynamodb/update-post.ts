import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Post} from '../../entity/post'

export async function updatePost(operator: DynamoDBInput, params: LikePostInput) {
  const {dynamodb, tableName} = operator
  const {data} = params
  const {hk, rk} = data
  const response = await dynamodb.update({
    ReturnConsumedCapacity   : 'TOTAL',
    ReturnValues             : 'ALL_NEW',
    TableName                : tableName,
    Key                      : {
      hk,
      rk
    },
    UpdateExpression         : 'SET #u = :u',
    ExpressionAttributeNames : {
      '#u': 'updatedAt'
    },
    ExpressionAttributeValues: {
      ':u': new Date().toISOString()
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
export type LikePostInput = {
  data: Post
}
