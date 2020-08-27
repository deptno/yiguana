import {{dynamodb, tableName}} from '..//input/dynamodb'
import * as R from 'ramda'
import {keys} from '../../dynamodb/keys'
import {ReportAgg} from '..//report/report-agg'
import {Comment, Post, Reply} from '../'
import {logStoreDdb} from '../../lib/log'

export function incReportAgg(operator: {dynamodb, tableName}, input: IncReportAggInput) {
  logStoreDdb('incReportCount input %j', input)

  const {dynamodb, tableName} = operator
  //FIXME: updatedAt 은 관례상 인자로 받아야한다. decrease 도 마찬가지 로직
  const updatedAt = new Date().toISOString()

  // https://github.com/deptno/yiguana/issues/102
  // `status` 를 Yiguana.EntityStatusType.requestedBlock 이 아니라 Yiguana.EntityStatusType.inAudit 부터 시작하는데 이는 정책 이슈
  return dynamodb
    .update({
      TableName: tableName,
      Key: {
        hk: input.hk,
        rk: keys.rk.agg.stringify({
          agg: Yiguana.EntityType.Agg,
          type: Yiguana.EntityType.Report,
          target: input.rk as Yiguana.EntityType.Post | Yiguana.EntityType.Comment,
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
        ':s': Yiguana.EntityStatusType.inAudit,
        ':z': 0,
        ':v': 1,
        ':a': keys.agg.stringify({
          type: Yiguana.EntityType.Report,
          entity: input.rk as Extract<Yiguana.EntityType, Yiguana.EntityType.Post | Yiguana.EntityType.Comment>,
        }),
        ':r': updatedAt,
        ':d': input,
      },
      ReturnValues: 'ALL_NEW',
    })
    .then<ReportAgg>(response => response.Attributes)
}
export type IncReportAggInput = Post | Comment | Reply
