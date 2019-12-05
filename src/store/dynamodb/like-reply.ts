import {DynamoDBInput} from '../../entity/input/dynamodb'
import * as R from 'ramda'
import {Reply} from '../../entity/reply'
import {EEntity, YiguanaDocumentHash} from '../../type'
import {deprecate} from 'util'

export const likeReply = deprecate((operator: DynamoDBInput, input: LikeReplyInput) => {
  const {dynamodb, tableName} = operator
  const {data} = input
  const {hk} = data
  const rk = EEntity.Comment

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
}, '@replace likeReply')

export type LikeReplyInput = {
  data: YiguanaDocumentHash
}
