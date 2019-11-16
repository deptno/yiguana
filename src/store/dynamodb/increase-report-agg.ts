import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntity} from '../../entity/enum'
import {YiguanaDocumentHashRange} from '../../dynamodb'
import * as R from 'ramda'
import {keys} from '../../dynamodb/keys'
import {ReportAgg} from '../../entity/report/report-agg'

export function increaseReportAgg(operator: DynamoDBInput, params: IncreaseReportAggInput) {
  const {dynamodb, tableName} = operator
  const {data} = params
  const {hk} = data

  //FIXME: updatedAt 은 관례상 인자로 받아야한다. decrease 도 마찬가지 로직
  return dynamodb
    .update({
      TableName: tableName,
      Key: {
        hk,
        rk: keys.rk.reportAgg.stringify({
          entity: EEntity.ReportAgg,
          target: data.rk // EEntity.Post|EEntity.Comment 인 것이 보장되어야 한다.
        }),
      },
      UpdateExpression: 'SET #v = if_not_exists(#v, :z) + :v, #u = :u, #c = if_not_exists(#c, :c)',
      ExpressionAttributeNames: {
        '#v': 'reported',
        '#u': 'reports',
        '#c': 'createdAt',
      },
      ExpressionAttributeValues: {
        ':z': 0,
        ':v': 1,
        ':c': 'createdAt',
        ':u': new Date().toISOString()
      },
      ReturnValues: 'ALL_NEW',
    })
    .then<ReportAgg>(R.prop('Attributes'))
}
export type IncreaseReportAggInput = {
  data: YiguanaDocumentHashRange
}
