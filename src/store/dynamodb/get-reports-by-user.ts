import {DynamoDBInput} from '../../entity/input/dynamodb'
import {keys} from '../../dynamodb/keys'
import {Report} from '../../entity'
import {EEntity, EIndexName} from '../../type'
import {logStoreDdb} from '../../lib/log'

export function getReportsByUser(operator: DynamoDBInput, input: ReportByUserInput) {
  logStoreDdb('getReportsByUser input %j', input)

  const {tableName, dynamodb} = operator
  const {entity, exclusiveStartKey, userId, limit = 10} = input

  return dynamodb.query<Report>({
    TableName: tableName,
    IndexName: EIndexName.byUser,
    KeyConditionExpression: '#p = :p and begins_with(#r, :r)',
    ExpressionAttributeNames: {
      '#p': 'userId',
      '#r': 'byUser',
    },
    ExpressionAttributeValues: {
      ':p': userId,
      ':r': keys.byUser.report.stringify({
        entity: EEntity.Report,
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
  entity?: EEntity.Post | EEntity.Comment
  limit?: number
  exclusiveStartKey?: Exclude<any, string | number>
}
