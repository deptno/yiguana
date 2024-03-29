import {DynamoDBInput} from '../../entity/input/dynamodb'
import {keys} from '../../dynamodb/keys'
import {Comment, Post} from '../../entity'
import {Report} from '../../entity/report'
import {EEntity} from '../../type'
import {logStoreDdb} from '../../lib/log'

export function getReports(operator: DynamoDBInput, input: ReportsInput) {
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
        entity: EEntity.Report,
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
  data: Pick<Post|Comment, 'hk'|'rk'>
  limit?: number
  exclusiveStartKey?: Exclude<any, string | number>
}
