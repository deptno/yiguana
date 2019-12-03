import * as R from 'ramda'
import {DynamoDBInput} from '../../entity/input/dynamodb'
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
      UpdateExpression: 'SET #a = :a, #s = :s REMOVE #e',
      ExpressionAttributeNames: {
        '#a': 'answer',
        '#s': 'status',
        '#e': 'reportsEnd',
      },
      ExpressionAttributeValues: {
        ':a': answer,
        ':s': status,
      },
      ReturnValues: 'ALL_NEW',
    })
    .then(R.prop('Attributes'))
}

export type ReportReplyInput = {
  hk: string
  rk: string
  answer: string
  status: EEntityStatus
}
