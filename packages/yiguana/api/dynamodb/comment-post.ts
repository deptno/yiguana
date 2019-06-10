import {DynamoDbApiInput, PostDocument} from './common'
import {update} from '../../../dynamodb/common'

export async function commentPost(params: DynamoDbApiInput & CommentPostInput) {
  const {client, tableName, post} = params
  const {id, range} = post
  const response = await update(client, {
    ReturnConsumedCapacity   : 'TOTAL',
    ReturnValues             : 'ALL_NEW',
    TableName                : tableName,
    Key                      : {
      id,
      range
    },
    UpdateExpression         : 'SET #v = #v + :v',
    ExpressionAttributeNames : {
      '#v': 'comments'
    },
    ExpressionAttributeValues: {
      ':v': 1
    }
  })
  if (response) {
    if (response.ConsumedCapacity) {
      const wcu = response.ConsumedCapacity.CapacityUnits
//      console.log({wcu})
    }
    return response.Attributes as PostDocument
  }
}
export type CommentPostInput = {
  post: PostDocument
}
