import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntity, EIndexName} from '../../type'
import {keys} from '../../dynamodb/keys'
import {ReportAgg} from '../../entity/report/report-agg'

export function aggReports(operator: DynamoDBInput, params: AggReportsInput) {
  const {tableName, dynamodb} = operator
  const {entity, exclusiveStartKey, limit = 10, end} = params
  const indexName = end ? EIndexName.reportsEnd : EIndexName.reports
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
