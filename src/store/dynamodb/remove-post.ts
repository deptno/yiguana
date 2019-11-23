import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Post} from '../../entity'
import * as R from 'ramda'

export function removePost(operator: DynamoDBInput, params: RemovePostInput) {
  const {dynamodb, tableName} = operator
  const {hk} = params
  const rk = 'post'

  return dynamodb
    .update({
      TableName: tableName,
      Key: {
        hk,
        rk,
      },
      UpdateExpression: [
        'SET dCategory = category, deleted = :d',
        'REMOVE category, posts',
      ].join(' '),
      ExpressionAttributeValues: {
        ':d': true,
      },
      ReturnConsumedCapacity: 'TOTAL',
      ReturnValues: 'ALL_NEW',
    })
    .then<Post>(R.prop('Attributes'))
}

export type RemovePostInput = {
  hk: string
}
