import {DynamoDBInput} from '../../entity/input/dynamodb'
import * as R from 'ramda'
import {keys} from '../../dynamodb/keys'
import {ReportAgg} from '../../entity/report/report-agg'
import {Comment, Post} from '../../entity'
import {EEntity, EEntityStatus} from '../../type'

export function increaseReportAgg(operator: DynamoDBInput, params: IncreaseReportAggInput) {
  const {dynamodb, tableName} = operator
  const {data, userId} = params
  //FIXME: updatedAt 은 관례상 인자로 받아야한다. decrease 도 마찬가지 로직
  const updatedAt = new Date().toISOString()

  // https://github.com/deptno/yiguana/issues/102
  // `status` 를 EEntityStatus.requestedBlock 이 아니라 EEntityStatus.inAudit 부터 시작하는데 이는 정책 이슈
  return dynamodb
    .update({
      TableName: tableName,
      Key: {
        hk: data.hk,
        rk: keys.rk.agg.stringify({
          agg: EEntity.Agg,
          type: EEntity.Report,
          target: data.rk as EEntity.Post | EEntity.Comment,
        }),
      },
      UpdateExpression: 'SET ' + [
        '#c = if_not_exists(#c, :c)',
        '#v = if_not_exists(#v, :z) + :v',
        '#s = if_not_exists(#s, :s)',
        '#a = :a',
        '#r = :r',
        '#d = :d',
      ].join(', '),
      ExpressionAttributeNames: {
        '#c': 'createdAt',
        '#v': 'reported',
        '#s': 'status',
        '#a': 'agg',
        '#r': 'reports',
        '#d': 'data',
      },
      ExpressionAttributeValues: {
        ':c': updatedAt,
        ':s': EEntityStatus.inAudit,
        ':z': 0,
        ':v': 1,
        ':a': keys.agg.stringify({
          type: EEntity.Report,
          entity: data.rk as Extract<EEntity, EEntity.Post | EEntity.Comment>,
        }),
        ':r': updatedAt,
        ':d': data,
      },
      ReturnValues: 'ALL_NEW',
    })
    .then<ReportAgg>(R.prop('Attributes'))
}
export type IncreaseReportAggInput = {
  data: Post | Comment
  userId: string
}
