import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Post} from '../../entity'
import * as R from 'ramda'
import {EEntityStatus, YiguanaDocumentHash} from '../../type'
import {logStoreDdb} from '../../lib/log'

export function removePost(operator: DynamoDBInput, input: RemovePostInput) {
  logStoreDdb('removePost input %j', input)

  const {dynamodb, tableName} = operator
  const {hk} = input
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

export type RemovePostInput = YiguanaDocumentHash
