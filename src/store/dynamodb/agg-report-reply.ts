import * as R from 'ramda'
import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntity, EEntityStatus} from '../../type'
import {keys} from '../../dynamodb/keys'

export function aggReportReply(operator: DynamoDBInput, params: AggReportReplyInput) {
  const {hk, entity, answer, status} = params

  return operator.dynamodb
    .update({
      TableName: operator.tableName,
      Key: {
        hk,
        rk: keys.rk.agg.stringify({
          agg: EEntity.Agg,
          type: EEntity.Report,
          target: entity,
        })
      },
      UpdateExpression: 'SET #a = :a, #s = :s, #v = if_not_exists(#v, :z) + :v REMOVE #r',
      ExpressionAttributeNames: {
        '#a': 'answer',
        '#s': 'status',
        '#v': 'processed',
        '#r': 'reports',
      },
      ExpressionAttributeValues: {
        ':a': answer,
        ':s': status,
        ':z': 0,
        ':v': 1,
      },
      ReturnValues: 'ALL_NEW',
    })
    .then(R.prop('Attributes'))
}

export type AggReportReplyInput = {
  hk: string
  entity: Extract<EEntity, EEntity.Post | EEntity.Comment>
  answer: string
  status: EEntityStatus
}
