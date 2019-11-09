import {Key} from 'readline'
import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Post} from '../../entity/post'
import {EEntity} from '../../entity/enum'
import {EIndexName} from '../../dynamodb/yiguana-index'
import {keys} from '../../dynamodb/keys'
import * as R from 'ramda'
import {Like} from '../../entity/like'
import {DocumentClient} from 'aws-sdk/clients/dynamodb'

export function postsByUserLike<T = Post>(operator: DynamoDBInput, params: PostsByUserLikeInput) {
  const {tableName, dynamodb} = operator
  const {entity, exclusiveStartKey, userId} = params
  const byUser = keys.byUser.stringify({
    entity: EEntity.Like,
  })
  const input: DocumentClient.QueryInput = {
    TableName: tableName,
    IndexName: EIndexName.byUser,
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
    Limit: 10,
  }
  if (entity) {
    input.ExpressionAttributeNames!['#e'] = 'rk'
    input.ExpressionAttributeValues![':e'] = keys.rk.like.stringify({
      entity: EEntity.Like,
      target: entity
    })
    input.FilterExpression = 'begins_with(#e, :e)'
  }

  return dynamodb.query<Like>(input)
}
export type PostsByUserLikeInput = {
  userId: string
  entity?: Extract<EEntity, EEntity.Post | EEntity.Comment>
  exclusiveStartKey?: Key
}
