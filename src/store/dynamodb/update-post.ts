import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Post} from '../../entity/post'
import * as R from 'ramda'
import {EEntity, YiguanaDocument} from '../../type'

export function updatePost(operator: DynamoDBInput, params: UpdatePostInput) {
  const {dynamodb, tableName} = operator
  const {data} = params
  const {hk, updatedAt} = data

  return dynamodb
    .update({
      TableName: tableName,
      Key: {
        hk,
        rk: EEntity.Post,
      },
      UpdateExpression: 'SET #u = :u',
      ExpressionAttributeNames: {
        '#u': 'updatedAt',
      },
      ExpressionAttributeValues: {
        ':u': updatedAt,
      },
      ReturnValues: 'ALL_NEW',
    })
    .then<Post>(R.prop('Attributes'))
}
export type UpdatePostInput = {
  data: Pick<YiguanaDocument, 'hk' | 'updatedAt'>
}
