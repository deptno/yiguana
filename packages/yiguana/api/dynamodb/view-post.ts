import {DynamoDbApiInput, PostDocument} from './common'
import {update} from '../../../dynamodb/common'

export async function viewPost(params: DynamoDbApiInput & ViewPostInput) {
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
      '#v': 'views'
    },
    ExpressionAttributeValues: {
      ':v': 1
    }
  })
  const wcu = response.ConsumedCapacity.CapacityUnits
//      console.log({wcu})
  return response.Attributes as PostDocument
}
export type ViewPostInput = {
  post: PostDocument
}
