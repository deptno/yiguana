import * as R from 'ramda'
import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntityStatus, YiguanaDocumentHashRange} from '../../type'
import {logStoreDdb} from '../../lib/log'

export function reportReply(operator: DynamoDBInput, input: ReportReplyInput) {
  logStoreDdb('reportReply input %j', input)

  const {data, answer, status} = input

  return operator.dynamodb
    .update({
      TableName: operator.tableName,
      Key: data,
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
  data: YiguanaDocumentHashRange
  answer: string
  status: EEntityStatus
}
