import * as R from 'ramda'
import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntityStatus} from '../../type'
import {logStoreDdb} from '../../lib/log'

export function reportReply(operator: DynamoDBInput, input: ReportReplyInput) {
  logStoreDdb('reportReply input %j', input)

  const {hk, rk, answer, status} = input

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
