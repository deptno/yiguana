import {DynamoDBInput, PostDocument} from './common'

export async function viewPost(operator: DynamoDBInput, params: ViewPostInput) {
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
      '#v': 'views'
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
    return response.Attributes as PostDocument
  }
}
export type ViewPostInput = {
  post: PostDocument
}