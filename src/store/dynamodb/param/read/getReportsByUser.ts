import {keys} from '../../../../dynamodb/keys'
import {logStoreDdb} from '../../../../lib/log'

export function getReportsByUser(tableName: string, input: Input) {
  logStoreDdb('getReportsByUser input %j', input)

  const {entity, exclusiveStartKey, userId, limit = 10} = input

  return {
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
  }
}

type Input = {
  userId: string
  entity?: Yiguana.EntityType.Post | Yiguana.EntityType.Comment
  limit?: number
  exclusiveStartKey?: Exclude<any, string | number>
}
