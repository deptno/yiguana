import {keys} from '../../../../dynamodb/keys'
import {logStoreDdb} from '../../../../lib/log'

export function decReportAgg(operator: {dynamodb, tableName}, input: DecReportAggInput) {
  logStoreDdb('decReportCount input %j', input)

  const {dynamodb, tableName} = operator
  const {hk, rk} = input

  return dynamodb
    .update({
      TableName: tableName,
      Key: {
        hk,
        rk: keys.rk.agg.stringify({
          agg: Yiguana.EntityType.Agg,
          type: Yiguana.EntityType.Report,
          target: rk // Yiguana.EntityType.Post|Yiguana.EntityType.Comment 인 것이 보장되어야 한다.
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
    .then<ReportAgg>(response => response.Attributes)
}
export type DecReportAggInput = Post | Comment | Reply
