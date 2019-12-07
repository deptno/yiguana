import {DynamoDBInput} from '../../entity/input/dynamodb'
import {keys} from '../../dynamodb/keys'
import {Report} from '../../entity/report'
import {EEntity, YiguanaDocumentHashRange} from '../../type'
import {logStoreDdb} from '../../lib/log'

export function getReportsAll(operator: DynamoDBInput, input: ReportsAllInput) {
  logStoreDdb('getReportsAll input %j', input)

  const {tableName, dynamodb} = operator
  const {hk, rk} = input

  return dynamodb.queryAll<Report>({
    TableName: tableName,
    KeyConditionExpression: '#h = :h AND begins_with(#r, :r)',
    ExpressionAttributeNames: {
      '#h': 'hk',
      '#r': 'rk',
    },
    ExpressionAttributeValues: {
      ':h': hk,
      ':r': keys.rk.report.stringify({
        entity: EEntity.Report,
        target: rk,
      }),
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'TOTAL',
  })
}

export type ReportsAllInput = YiguanaDocumentHashRange
