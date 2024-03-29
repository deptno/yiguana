import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntity, EIndexName} from '../../type'
import {keys} from '../../dynamodb/keys'
import {ReportAgg} from '../../entity/report/report-agg'
import {logStoreDdb} from '../../lib/log'

export function getAggReports(operator: DynamoDBInput, input: AggReportsInput) {
  logStoreDdb('getAggReports input %j', input)

  const {tableName, dynamodb} = operator
  const {entity, exclusiveStartKey, limit = 10, end} = input
  const indexName = end
    ? EIndexName.reportsEnd
    : EIndexName.reports
  const queryParams = {
    TableName: tableName,
    IndexName: indexName,
    KeyConditionExpression: '#h = :h',
    ExpressionAttributeNames: {
      '#h': 'agg',
    },
    ExpressionAttributeValues: {
      ':h': keys.agg.stringify({
        type: EEntity.Report,
        entity
      }),
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'TOTAL',
    ExclusiveStartKey: exclusiveStartKey,
    Limit: limit
  }

  return dynamodb.query<ReportAgg>(queryParams)
}

export type AggReportsInput = {
  limit?: number
  exclusiveStartKey?: Exclude<any, string | number>
  end?: boolean
  entity: Extract<EEntity, EEntity.Post|EEntity.Comment>
}
