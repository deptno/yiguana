import {DynamoDBInput} from '../../entity/input/dynamodb'
import {YiguanaDocumentHashRange} from '../../dynamodb'
import * as R from 'ramda'
import {keys} from '../../dynamodb/keys'
import {ReportAgg} from '../../entity/report/report-agg'
import {EEntity} from '../../type'

export function decreaseReportAgg(operator: DynamoDBInput, params: DecreaseReportAggInput) {
  const {dynamodb, tableName} = operator
  const {data, userId} = params
  const {hk} = data

  return dynamodb
    .update({
      TableName: tableName,
      Key: {
        hk,
        rk: keys.rk.agg.stringify({
          agg: EEntity.Agg,
          type: EEntity.Report,
          target: data.rk // EEntity.Post|EEntity.Comment 인 것이 보장되어야 한다.
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
export type DecreaseReportAggInput = {
  data: YiguanaDocumentHashRange
  userId: string
}
