import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EIndexName} from '../../dynamodb'
import {EEntity} from '../../entity/enum'
import {keys} from '../../dynamodb/keys'
import {ReportAgg} from '../../entity/report/report-agg'

export function reports(operator: DynamoDBInput, params: ReportsInput) {
  const {tableName, dynamodb} = operator
  const {entity, exclusiveStartKey} = params
  const queryParams = {
    TableName: tableName,
    IndexName: EIndexName.reports,
    KeyConditionExpression: '#h = :h',
    ExpressionAttributeNames: {
      '#h': 'agg',
    },
    ExpressionAttributeValues: {
      ':h': keys.agg.stringify({
        aggReport: EEntity.AggReport,
        entity
      }),
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'TOTAL',
    ExclusiveStartKey: exclusiveStartKey,
    Limit: 50
  }

  return dynamodb.query<ReportAgg>(queryParams)
}

export type ReportsInput = {
  exclusiveStartKey?: Exclude<any, string | number>
  entity: Extract<EEntity, EEntity.Post|EEntity.Comment>
}
