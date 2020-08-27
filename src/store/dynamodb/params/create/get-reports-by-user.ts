import {{dynamodb, tableName}} from '..//input/dynamodb'
import {keys} from '../../../../dynamodb/keys'
import {Report} from '../../.'
import {logStoreDdb} from '../../../../lib/log'

export function getReportsByUser(operator: {dynamodb, tableName}, input: ReportByUserInput) {
  logStoreDdb('getReportsByUser input %j', input)

  const {tableName, dynamodb} = operator
  const {entity, exclusiveStartKey, userId, limit = 10} = input

  return dynamodb.query<Report>({
    TableName: tableName,
    IndexName: Yiguana.IndexType.byUser,
    KeyConditionExpression: '#p = :p and begins_with(#r, :r)',
    ExpressionAttributeNames: {
      '#p': 'userId',
      '#r': 'byUser',
    },
    ExpressionAttributeValues: {
      ':p': userId,
      ':r': keys.byUser.report.stringify({
        entity: Yiguana.EntityType.Report,
        target: entity
      }),
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'TOTAL',
    ExclusiveStartKey: exclusiveStartKey,
    Limit: limit,
  })
}

export type ReportByUserInput = {
  userId: string
  entity?: Yiguana.EntityType.Post | Yiguana.EntityType.Comment
  limit?: number
  exclusiveStartKey?: Exclude<any, string | number>
}