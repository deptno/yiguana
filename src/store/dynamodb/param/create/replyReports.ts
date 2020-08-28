import {logStoreDdb} from '../../../../lib/log'

export function replyReports(tableName: string, input: Input) {
  logStoreDdb('replyReports input %j', input)

  const {data, answer, status} = input

  return {
    TableName: tableName,
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
  }
}

type Input = {
  data: Yiguana.Document
  answer: string
  status: Yiguana.EntityStatusType
}
