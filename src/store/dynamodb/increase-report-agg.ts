import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntity} from '../../entity/enum'
import {YiguanaDocumentHashRange} from '../../dynamodb'
import * as R from 'ramda'
import {keys} from '../../dynamodb/keys'
import {ReportAgg} from '../../entity/report/report-agg'
import {Post, Comment} from '../../entity'

export function increaseReportAgg(operator: DynamoDBInput, params: IncreaseReportAggInput) {
  const {dynamodb, tableName} = operator
  const {data} = params
  const {hk, rk} = data
  //FIXME: updatedAt 은 관례상 인자로 받아야한다. decrease 도 마찬가지 로직
  const updatedAt = new Date().toISOString()
  const agg = keys.agg.stringify({
    type: EEntity.Report,
    entity: data.data.rk as Extract<EEntity, EEntity.Post|EEntity.Comment>,
  })

  return dynamodb
    .update({
      TableName: tableName,
      Key: {
        hk,
        rk: keys.rk.reportAgg.stringify({
          entity: EEntity.AggReport,
          target: data.rk // EEntity.Post|EEntity.Comment 인 것이 보장되어야 한다.
        }),
      },
      UpdateExpression: 'SET #c = if_not_exists(#c, :c), #v = if_not_exists(#v, :z) + :v, #a = :a, #r = :r, #d = :d',
      ExpressionAttributeNames: {
        '#c': 'createdAt',
        '#v': 'reported',
        '#a': 'agg',
        '#r': 'reports',
        '#d': 'data',
      },
      ExpressionAttributeValues: {
        ':c': updatedAt,
        ':z': 0,
        ':v': 1,
        ':a': agg,
        ':r': updatedAt,
        ':d': data.data
      },
      ReturnValues: 'ALL_NEW',
    })
    .then<ReportAgg>(R.prop('Attributes'))
}
export type IncreaseReportAggInput = {
  data: YiguanaDocumentHashRange & {
    data: Post|Comment
  }
}
