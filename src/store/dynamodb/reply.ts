import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Post} from '../../entity/post'
import {Reply} from '../../entity/reply/reply'

export async function reply(operator: DynamoDBInput, params: ReplyInput) {
  const {dynamodb, tableName} = operator
  const {hk, rk} = params.reply
  const response = await dynamodb.update({
    TableName                : tableName,
    Key                      : {
      hk,
      rk
    },
    UpdateExpression         : 'SET #v = #v + :v',
    ExpressionAttributeNames : {
      '#v': 'replies'
    },
    ExpressionAttributeValues: {
      ':v': 1
    },
    ReturnConsumedCapacity: 'TOTAL',
    ReturnValues          : 'ALL_NEW',
  })
  if (response) {
    if (response.ConsumedCapacity) {
      const wcu = response.ConsumedCapacity.CapacityUnits
      console.log({wcu})
    }
    return response.Attributes as Post
  }
}

export type ReplyInput = {
  reply: Reply
}
