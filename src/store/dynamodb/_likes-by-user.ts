import {Key} from 'readline'
import {keys} from '../../dynamodb/keys'
import {DocumentClient} from 'aws-sdk/clients/dynamodb'
import LikeDocument = Yiguana.LikeDocument

export function _likesByUser(operator: {dynamodb, tableName}, params) {
  const {tableName, dynamodb} = operator
  const {entity, exclusiveStartKey, userId, limit = 10} = params
  const byUser = keys.byUser.like.stringify({
    entity: Yiguana.EntityType.Like,
  })
  const input: DocumentClient.QueryInput = {
    TableName: tableName,
    IndexName: Yiguana.IndexType.byUser,
    KeyConditionExpression: '#p = :p and begins_with(#r, :r)',
    ExpressionAttributeNames: {
      '#p': 'userId',
      '#r': 'byUser',
    },
    ExpressionAttributeValues: {
      ':p': userId,
      ':r': byUser,
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'TOTAL',
    ExclusiveStartKey: exclusiveStartKey,
    Limit: limit
  }
  if (entity) {
    input.ExpressionAttributeNames!['#e'] = 'rk'
    input.ExpressionAttributeValues![':e'] = keys.rk.like.stringify({
      entity: Yiguana.EntityType.Like,
      target: entity
    })
    input.FilterExpression = 'begins_with(#e, :e)'
  }

  return dynamodb.query<LikeDocument>(input)
}
export type QueryByUserLike<T extends Extract<Yiguana.EntityType, Yiguana.EntityType.Post | Yiguana.EntityType.Comment>> = {
  userId: string
  entity?: T
  limit?: number
  exclusiveStartKey?: Key
}
