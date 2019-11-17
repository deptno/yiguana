import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntity} from '../../entity/enum'
import * as R from 'ramda'
import {keys} from '../../dynamodb/keys'
import {ReportAgg} from '../../entity/report/report-agg'
import {Comment, Post} from '../../entity'

export function increaseReportAgg(operator: DynamoDBInput, params: IncreaseReportAggInput) {
  const {dynamodb, tableName} = operator
  const {data, userId} = params
  //FIXME: updatedAt 은 관례상 인자로 받아야한다. decrease 도 마찬가지 로직
  const updatedAt = new Date().toISOString()

  return dynamodb
    .update({
      TableName: tableName,
      Key: {
        hk: data.hk,
        rk: keys.rk.agg.stringify({
          agg: EEntity.Agg,
          type: EEntity.Report,
          target: data.rk as EEntity.Post|EEntity.Comment,
          userId,
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
        ':a': keys.agg.stringify({
          type: EEntity.Report,
          entity: data.rk as Extract<EEntity, EEntity.Post | EEntity.Comment>,
        }),
        ':r': updatedAt,
        ':d': data
      },
      ReturnValues: 'ALL_NEW',
    })
    .then<ReportAgg>(R.prop('Attributes'))
}
export type IncreaseReportAggInput = {
  data: Post|Comment
  userId: string
}
