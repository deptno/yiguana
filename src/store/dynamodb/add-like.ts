import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Like} from '../../entity/like'
import * as R from 'ramda'

export function addLike(operator: DynamoDBInput, params: AddLikeInput) {
  const {dynamodb, tableName} = operator
  const {data} = params

  return dynamodb
    .update<Like>({
      TableName: tableName,
      Key: {
        hk: data.hk,
        rk: data.rk,
      },
      UpdateExpression: 'SET #u = :u, #b = :b, #c = :c, #uid = :uid, #d = :d',
      ExpressionAttributeNames: {
        '#h': 'hk',
        '#u': 'userId',
        '#b': 'byUser',
        '#c': 'createdAt',
        '#uid': 'user',
        '#d': 'data',
      },
      ExpressionAttributeValues: {
        ':u': data.userId,
        ':b': data.byUser,
        ':c': data.createdAt,
        ':uid': data.user,
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