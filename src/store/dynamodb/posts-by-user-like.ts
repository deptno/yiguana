import {Key} from 'readline'
import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Post} from '../../entity/post'
import {EEntity} from '../../entity/enum'
import {EIndexName} from '../../dynamodb/yiguana-index'
import {keys} from '../../dynamodb/keys'
import * as R from 'ramda'
import {Like} from '../../entity/like'

export function postsByUserLike<T = Post>(operator: DynamoDBInput, params: PostsByUserLikeInput) {
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
        ':r': keys.like.stringify({
          userId,
          entity,
        } as any),
      },
      ScanIndexForward: false,
      ReturnConsumedCapacity: 'TOTAL',
      ExclusiveStartKey: exclusiveStartKey,
      Limit: 10,
    })
    .then(async response => {
      // TODO: 테스트 데이터때문에 데이터 중복이 존재한다. 실제로는 존재할 수 없을 것으로 생각된다.

      const parsedList = Array.from(new Set(response.items.map(l => l.like)))
      const [items, rcu] = await dynamodb.batchGet({
        tableName,
        keysList: parsedList
          .map(keys.like.parse)
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
export type PostsByUserLikeInput = {
  userId: string
  entity?: Extract<EEntity, EEntity.Post | EEntity.Comment | EEntity.Reply>
  exclusiveStartKey?: Key
}
