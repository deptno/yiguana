import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EIndexName} from '../../dynamodb'
import {keys} from '../../dynamodb/keys'
import {ReportAgg} from '../../entity/report/report-agg'
import {EEntity} from '../../type'

export function aggReports(operator: DynamoDBInput, params: AggReportsInput) {
  const {tableName, dynamodb} = operator
  const {entity, exclusiveStartKey, limit = 10} = params
  const queryParams = {
    TableName: tableName,
    IndexName: EIndexName.reports,
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
  entity: Extract<EEntity, EEntity.Post|EEntity.Comment>
}
