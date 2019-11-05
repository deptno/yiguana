import {Key} from 'readline'
import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntity} from '../../entity/enum'
import {EIndexName} from '../../dynamodb/yiguana-index'
import {keys} from '../../dynamodb/keys'
import * as R from 'ramda'
import {Like} from '../../entity/like'
import {Reply} from '../../entity/reply'

export function repliesByUserLike<T = Reply>(operator: DynamoDBInput, params: RepliesByUserLikeInput) {
  const {tableName, dynamodb} = operator
  const {entity, exclusiveStartKey, userId} = params

  return dynamodb
    .query<Like>({
      TableName: tableName,
      IndexName: EIndexName.RkLike,
      KeyConditionExpression: '#p = :p and begins_with(#r, :r)',
      ExpressionAttributeNames: {
        '#p': 'rk',
        '#r': 'like',
      },
      ExpressionAttributeValues: {
        ':p': EEntity.Like,
        ':r': keys.like.like.stringify({
          userId,
          entity,
        }),
      },
      ScanIndexForward: false,
      ReturnConsumedCapacity: 'TOTAL',
      ExclusiveStartKey: exclusiveStartKey,
      Limit: 10,
    })
    .then(async response => {
      const parsedList = Array.from(new Set(response.items.map(l => l.like)))
      const [items, rcu] = await dynamodb.batchGet({
        tableName,
        keysList: parsedList
          .map(keys.like.like.parse)
          .map(({entity: rk, targetId: hk}) => {
            return {
              hk,
              rk
            }
          }),
      })

      return {
        ...response,
        items: items as T[],
      }
    })
    .then(R.tap(console.log))
}
export type RepliesByUserLikeInput = {
  userId: string
  entity?: Extract<EEntity, EEntity.Post | EEntity.Comment | EEntity.Reply>
  exclusiveStartKey?: Key
}
