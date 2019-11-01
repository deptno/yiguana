import {DynamoDBInput} from '../../entity/input/dynamodb'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'
import {EEntity} from '../../entity/enum'
import * as R from 'ramda'
import {Reply} from '../../entity/reply'

export async function unlikeReply(operator: DynamoDBInput, params: UnlikeReplyInput) {
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
        rk: EEntity.Reply,
      },
      UpdateExpression: 'SET #v = #v - :v',
      ExpressionAttributeNames: {
        '#v': 'likes',
      },
      ExpressionAttributeValues: {
        ':v': 1,
      },
    })
    .then<Reply>(R.prop('Attributes'))
}
export type UnlikeReplyInput = {
  data: YiguanaDocumentHash
}
