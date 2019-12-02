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
      UpdateExpression: 'SET #a = :a, #s = :s',
      ExpressionAttributeNames: {
        '#a': 'answer',
        '#s': 'status',
      },
      ExpressionAttributeValues: {
        ':a': answer,
        ':s': status,
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
