import * as R from 'ramda'
import {logStoreDdb} from '../../lib/log'

export function replyReports(operator: {dynamodb, tableName}, input: ReplyReportInput) {
  logStoreDdb('replyReports input %j', input)

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
    .then(response => response.Attributes)
}

export type ReplyReportInput = {
  data: Yiguana.Document
  answer: string
  status: Yiguana.EntityStatusType
}
