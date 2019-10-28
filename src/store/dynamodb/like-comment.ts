import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntity} from '../../entity/enum'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'
import {Comment} from '../../entity/comment'
import * as R from 'ramda'

export function likeComment(operator: DynamoDBInput, input: LikeCommentInput) {
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
    .then<Comment>(R.prop('Attributes'))
}
export type LikeCommentInput = {
  data: YiguanaDocumentHash
}
