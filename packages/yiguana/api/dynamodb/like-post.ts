import {CreateApiInput, PostDocument} from './common'

export async function likePost(operator: CreateApiInput, params: LikePostInput) {
  const {dynamodb, tableName} = operator
  const {post} = params
  const {id, range} = post
  const response = await dynamodb.update({
    ReturnConsumedCapacity   : 'TOTAL',
    ReturnValues             : 'ALL_NEW',
    TableName                : tableName,
    Key                      : {
      id,
      range
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
    if (response.ConsumedCapacity) {
      const wcu = response.ConsumedCapacity.CapacityUnits
      console.log({wcu})
    }
    return response.Attributes as PostDocument
  }
}
export type LikePostInput = {
  post: PostDocument
}
