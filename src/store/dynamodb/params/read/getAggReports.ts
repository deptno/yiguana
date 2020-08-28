import {keys} from '../../../../dynamodb/keys'
import {logStoreDdb} from '../../../../lib/log'

export function getAggReports(tableName: string, input: AggReportsInput) {
  logStoreDdb('getAggReports input %j', input)

  const {entity, exclusiveStartKey, limit = 10, end} = input
  const indexName = end
    ? Yiguana.IndexType.reportsEnd
    : Yiguana.IndexType.reports

  return {
    TableName: tableName,
    IndexName: indexName,
    KeyConditionExpression: '#h = :h',
    ExpressionAttributeNames: {
      '#h': 'agg',
    },
    ExpressionAttributeValues: {
      ':h': keys.agg.stringify({
        type: Yiguana.EntityType.Report,
        entity
      }),
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'TOTAL',
    ExclusiveStartKey: exclusiveStartKey,
    Limit: limit
  }
}

export type AggReportsInput = {
  limit?: number
  exclusiveStartKey?: Exclude<any, string | number>
  end?: boolean
  entity: Extract<Yiguana.EntityType, Yiguana.EntityType.Post|Yiguana.EntityType.Comment>
}
