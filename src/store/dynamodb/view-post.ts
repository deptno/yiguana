import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Post} from '../../entity/post'
import * as R from 'ramda'
import {EEntity, YiguanaDocumentHash} from '../../type'

export async function viewPost(operator: DynamoDBInput, params: ViewPostInput) {
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
        rk: EEntity.Post,
      },
      UpdateExpression: 'SET #v = #v + :v',
      ExpressionAttributeNames: {
        '#v': 'views',
      },
      ExpressionAttributeValues: {
        ':v': 1,
      },
    })
    .then<Post>(R.prop('Attributes'))
}
export type ViewPostInput = {
  data: YiguanaDocumentHash
}
