import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntity} from '../../entity/enum'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'
import * as R from 'ramda'
import {Reply} from '../../entity/reply'

export function likeReply(operator: DynamoDBInput, input: LikeReplyInput) {
  const {dynamodb, tableName} = operator
  const {data} = input
  const {hk} = data
  const rk = EEntity.Reply

  return dynamodb
    .update({
      TableName: tableName,
      Key: {
        hk,
        rk,
      },
      UpdateExpression: 'SET #v = #v + :v',
      ExpressionAttributeNames: {
        '#v': 'likes',
      },
      ExpressionAttributeValues: {
        ':v': 1,
      },
      ReturnValues: 'ALL_NEW',
    })
    .then<Reply>(R.prop('Attributes'))
}
export type LikeReplyInput = {
  data: YiguanaDocumentHash
}
