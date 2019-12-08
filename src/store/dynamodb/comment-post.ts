import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Comment} from '../../entity'
import * as R from 'ramda'
import {EEntity, YiguanaDocumentHash} from '../../type'

export async function commentPost(operator: DynamoDBInput, params: CommentPostInput) {
  const {dynamodb, tableName} = operator
  const {data} = params
  const {hk} = data

  return dynamodb
    .update({
      TableName: tableName,
      Key: {
        hk,
        rk: EEntity.Post,
      },
      UpdateExpression: 'SET #v = #v + :v',
      ExpressionAttributeNames: {
        '#v': 'children',
      },
      ExpressionAttributeValues: {
        ':v': 1,
      },
      ReturnConsumedCapacity: 'TOTAL',
      ReturnValues: 'ALL_NEW',
    })
    .then<Comment>(R.prop('Attributes'))
}

export type CommentPostInput = {
  data: YiguanaDocumentHash
}
