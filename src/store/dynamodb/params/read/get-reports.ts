import {{dynamodb, tableName}} from '..//input/dynamodb'
import {keys} from '../../../../dynamodb/keys'
import {Comment, Post} from '../..'
import {Report} from '..//report'
import {logStoreDdb} from '../../../../lib/log'

export function getReports(operator: {dynamodb, tableName}, input: ReportsInput) {
  logStoreDdb('getReports input %j', input)

  const {tableName, dynamodb} = operator
  const {data, exclusiveStartKey, limit = 10} = input

  return dynamodb.query<Report>({
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
  })
}

export type ReportsInput = {
  data: Yiguana.Document
  limit?: number
  exclusiveStartKey?: Exclude<any, string | number>
}
