import {Key} from 'readline'
import {keys} from '../../../../dynamodb/keys'
import {DocumentClient} from 'aws-sdk/clients/dynamodb'

export function _likesByUser(tableName: string, input: QueryByUserLike) {
  const {entity, exclusiveStartKey, userId, limit = 10} = input
  const byUser = keys.byUser.like.stringify({
    entity: Yiguana.EntityType.Like,
  })
  const params: DocumentClient.QueryInput = {
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
    Limit: limit,
  }

  if (entity) {
    return {
      ...params,
      ExpressionAttributeNames: {
        '#e': 'rk',
      },
      ExpressionAttributeValues: {
        ':e': keys.rk.like.stringify({
          entity: Yiguana.EntityType.Like,
          target: entity
        }),
      },
      FilterExpression: 'begins_with(#e, :e)',
    }
  }
  return params
}
type QueryByUserLike = {
  userId: string
  entity?: Omit<Yiguana.EntityType, Yiguana.EntityType.Like>
  limit?: number
  exclusiveStartKey?: Key
}