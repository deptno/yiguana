import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntity} from '../../type'
import * as R from 'ramda'
import {keys} from '../../dynamodb/keys'
import {ReportAgg} from '../../entity/report/report-agg'
import {logStoreDdb} from '../../lib/log'
import {Post} from '../../entity/post'
import {Comment} from '../../entity/comment'

export function decReportAgg(operator: DynamoDBInput, input: DecReportAggInput) {
  logStoreDdb('decReportCount input %j', input)

  const {dynamodb, tableName} = operator
  const {hk, rk} = input

  return dynamodb
    .update({
      TableName: tableName,
      Key: {
        hk,
        rk: keys.rk.agg.stringify({
          agg: EEntity.Agg,
          type: EEntity.Report,
          target: rk // EEntity.Post|EEntity.Comment 인 것이 보장되어야 한다.
        }),
      },
      UpdateExpression: 'SET #v = #v + :v',
      ExpressionAttributeNames: {
        '#v': 'reported',
      },
      ExpressionAttributeValues: {
        ':v': -1,
      },
      ReturnValues: 'ALL_NEW',
    })
    .then<ReportAgg>(R.prop('Attributes'))
}
export type DecReportAggInput = Post | Comment
