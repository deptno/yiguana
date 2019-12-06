import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Reply} from '../../entity/reply'
import {keys} from '../../dynamodb/keys'
import {EEntity, EIndexName} from '../../type'

export function getRepliesByUserId<T = Reply>(operator: DynamoDBInput, params: RepliesByUserIdInput) {
  const {tableName, dynamodb} = operator
  const {userId, exclusiveStartKey} = params
  const queryParams = {
    TableName: tableName,
    IndexName: EIndexName.byUser,
    KeyConditionExpression: '#h = :h AND begins_with(#r, :r)',
    ExpressionAttributeNames: {
      '#h': 'userId',
      '#r': 'byUser',
    },
    ExpressionAttributeValues: {
      ':h': userId,
      ':r': keys.byUser.reply.stringify({
        entity: EEntity.Comment,
      })
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'TOTAL',
    ExclusiveStartKey: exclusiveStartKey
  }

  return dynamodb.query<T>(queryParams)
}

export type RepliesByUserIdInput = {
  userId: string
  exclusiveStartKey?: Exclude<any, string | number>
}
