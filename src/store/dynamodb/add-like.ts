import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Like} from '../../entity/like'
import * as R from 'ramda'
import {logStoreDdb} from '../../lib/log'

export function addLike(operator: DynamoDBInput, input: AddLikeInput) {
  logStoreDdb('addLike input %j', input)

  const {dynamodb, tableName} = operator
  const {data} = input

  return dynamodb
    .update<Like>({
      TableName: tableName,
      Key: {
        hk: data.hk,
        rk: data.rk,
      },
      UpdateExpression: 'SET #uid = :uid, #b = :b, #c = :c, #u = :u, #d = :d',
      ExpressionAttributeNames: {
        '#h': 'hk',
        '#uid': 'userId',
        '#b': 'byUser',
        '#c': 'createdAt',
        '#u': 'user',
        '#d': 'data',
      },
      ExpressionAttributeValues: {
        ':uid': data.userId,
        ':b': data.byUser,
        ':c': data.createdAt,
        ':u': data.user,
        ':d': data.data,
      },
      ConditionExpression: 'attribute_not_exists(#h)',
      ReturnValues: 'ALL_NEW',
    })
    .then<Like>(R.prop('Attributes'))
}

export type AddLikeInput = {
  data: Like
}