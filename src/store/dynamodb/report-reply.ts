import {DynamoDBInput} from '../../entity/input/dynamodb'
import * as R from 'ramda'
import {EEntityStatus} from '../../type'

export function reportReply(operator: DynamoDBInput, params: ReportReplyInput) {
  const {hk, rk, answer, status} = params

  return operator.dynamodb
    .update({
      TableName: operator.tableName,
      Key: {
        hk,
        rk,
      },
      UpdateExpression: 'SET #a = :a, #s = :s',
      ExpressionAttributeNames: {
        '#a': 'answer',
        '#s': 'status',
      },
      ExpressionAttributeValues: {
        ':a': answer,
        ':s': status,
      },
    })
    .then(R.prop('Attributes'))
}

export type ReportReplyInput = {
  hk: string
  rk: string
  answer: string
  status: EEntityStatus
}
