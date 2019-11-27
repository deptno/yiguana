import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntity} from '../../entity/enum'
import {keys} from '../../dynamodb/keys'
import {Post, Comment} from '../../entity'
import * as R from 'ramda'
import {Report} from '../../entity/report'

export function reports(operator: DynamoDBInput, params: ReportsInput) {
  const {tableName, dynamodb} = operator
  const {data, exclusiveStartKey, limit} = params
  const queryParams = {
    TableName: tableName,
    KeyConditionExpression: '#h = :h AND begins_with(#r, :r)',
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
    Limit: limit
  }

  return dynamodb.query<Report>(queryParams)
}

export type ReportsInput = {
  data: Pick<Post|Comment, 'hk'|'rk'>
  limit?: number
  exclusiveStartKey?: Exclude<any, string | number>
}
