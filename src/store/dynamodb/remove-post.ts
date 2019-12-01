import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Post} from '../../entity'
import * as R from 'ramda'
import {EEntityStatus} from '../../type'

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
      UpdateExpression: 'SET #s = :s',
      ExpressionAttributeNames: {
        '#s': 'status'
      },
      ExpressionAttributeValues: {
        ':s': EEntityStatus.deletedByUser
      },
      ReturnConsumedCapacity: 'TOTAL',
      ReturnValues: 'ALL_NEW',
    })
    .then<Post>(R.prop('Attributes'))
}

export type RemovePostInput = {
  hk: string
}
