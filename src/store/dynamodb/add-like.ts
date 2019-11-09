import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Like} from '../../entity/like'
import * as R from 'ramda'

export function addLike(operator: DynamoDBInput, params: AddLikeInput) {
  const {dynamodb, tableName} = operator
  const {data} = params

  return dynamodb
    .update({
      TableName: tableName,
      Key: {
        hk: data.hk,
        rk: data.rk,
      },
      UpdateExpression: 'SET #u = :u, #b = :b, #c = :c, #uid = :uid',
      ExpressionAttributeNames: {
        '#h': 'hk',
        '#u': 'userId',
        '#b': 'byUser',
        '#c': 'createdAt',
        '#uid': 'user',
      },
      ExpressionAttributeValues: {
        ':u': data.userId,
        ':b': data.byUser,
        ':c': data.createdAt,
        ':uid': data.user,
      },
      ConditionExpression: 'attribute_not_exists(#h)',
      ReturnValues: 'ALL_NEW',
    })
    .then(R.prop('Attributes'))
}

export type AddLikeInput = {
  data: Like
}