import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Post} from '../../entity/post'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'
import * as R from 'ramda'
import {EEntity} from '../../type'

export function likePost(operator: DynamoDBInput, params: LikePostInput) {
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
        '#v': 'likes',
      },
      ExpressionAttributeValues: {
        ':v': 1,
      },
      ReturnValues: 'ALL_NEW',
    })
    .then<Post>(R.prop('Attributes'))
}
export type LikePostInput = {
  data: YiguanaDocumentHash
}
