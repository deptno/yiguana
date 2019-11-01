import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntity} from '../../entity/enum'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'
import * as R from 'ramda'

export async function unlikeComment(operator: DynamoDBInput, params: UnlikeCommentInput) {
  const {dynamodb, tableName} = operator
  const {data} = params
  const {hk} = data

  return dynamodb
    .update({
      ReturnConsumedCapacity: 'TOTAL',
      ReturnValues: 'ALL_NEW',
      TableName: tableName,
      Key: {
        hk,
        rk: EEntity.Comment,
      },
      UpdateExpression: 'SET #v = #v - :v',
      ExpressionAttributeNames: {
        '#v': 'likes',
      },
      ExpressionAttributeValues: {
        ':v': 1,
      },
    })
    .then<Comment>(R.prop('Attributes'))
}

export type UnlikeCommentInput = {
  data: YiguanaDocumentHash
}
