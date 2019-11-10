import {Post} from '../../entity/post'
import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EIndexName} from '../../dynamodb'
import {EEntity} from '../../entity/enum'
import {keys} from '../../dynamodb/keys'

export function reports(operator: DynamoDBInput, params: ReportsInput) {
  const {tableName, dynamodb} = operator
  const {exclusiveStartKey} = params
  const queryParams = {
    TableName: tableName,
    IndexName: EIndexName.reports,
    KeyConditionExpression: '#h = :h',
    ExpressionAttributeNames: {
      '#h': 'rk',
    },
    ExpressionAttributeValues: {
      ':h': keys.rk.reportAgg.stringify({
        entity: EEntity.ReportAgg
      }),
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'TOTAL',
    ExclusiveStartKey: exclusiveStartKey,
    Limit: 50
  }

  return dynamodb.query<Post>(queryParams)
}

export type ReportsInput = {
  exclusiveStartKey?: Exclude<any, string | number>
}
