import {keys} from '../../../../dynamodb/keys'
import {logStoreDdb} from '../../../../lib/log'

export function getReports(tableName: string, input: Input) {
  logStoreDdb('getReports input %j', input)

  const {data, exclusiveStartKey, limit = 10} = input

  return {
    TableName: tableName,
    KeyConditionExpression: '#h = :h AND begins_with(#r, :r)',
    ExpressionAttributeNames: {
      '#h': 'hk',
      '#r': 'rk',
    },
    ExpressionAttributeValues: {
      ':h': data.hk,
      ':r': keys.rk.report.stringify({
        entity: Yiguana.EntityType.Report,
        target: data.rk
      }),
    },
    ScanIndexForward: false,
    Limit: limit,
    ReturnConsumedCapacity: 'TOTAL',
    ExclusiveStartKey: exclusiveStartKey,
  }
}

type Input = {
  data: Yiguana.Document
  limit?: number
  exclusiveStartKey?: Exclude<any, string | number>
}
