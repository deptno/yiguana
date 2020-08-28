import {keys} from '../../../../dynamodb/keys'
import {logStoreDdb} from '../../../../lib/log'

export function getAllReports(tableName: string, input: DynamoDB.Document) {
  logStoreDdb('getAllReports input %j', input)

  const {hk, rk} = input

  return {
    TableName: tableName,
    KeyConditionExpression: '#h = :h AND begins_with(#r, :r)',
    ExpressionAttributeNames: {
      '#h': 'hk',
      '#r': 'rk',
    },
    ExpressionAttributeValues: {
      ':h': hk,
      ':r': keys.rk.report.stringify({
        entity: Yiguana.EntityType.Report,
        target: rk,
      }),
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'TOTAL',
  }
}
