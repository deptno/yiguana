import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntity} from '../../entity/enum'
import {keys} from '../../dynamodb/keys'
import {ReportAgg} from '../../entity/report/report-agg'
import {Post, Comment} from '../../entity'

export function reports(operator: DynamoDBInput, params: ReportsInput) {
  const {tableName, dynamodb} = operator
  const {data, exclusiveStartKey} = params
  const queryParams = {
    TableName: tableName,
    KeyConditionExpression: '#h = :h AND #r = :r',
    ExpressionAttributeNames: {
      '#h': 'hk',
      '#r': 'rk',
    },
    ExpressionAttributeValues: {
      ':h': data.hk,
      ':r': keys.rk.report.stringify({
        entity: EEntity.Report,
        target: data.rk
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
  data: Pick<Post|Comment, 'hk'|'rk'>
}
