import * as R from 'ramda'
import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntity, EEntityStatus, YiguanaDocumentHash} from '../../type'
import {keys} from '../../dynamodb/keys'
import {logStoreDdb} from '../../lib/log'

export function replyAggReport(operator: DynamoDBInput, input: ReplyAggReportInput) {
  logStoreDdb('getRggReportReply input %j', input)

  const {data: {hk}, entity, answer, status} = input

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
      UpdateExpression: 'SET #a = :a, #s = :s, #v = if_not_exists(#v, :z) + #rd, #e = #r REMOVE #r',
      ExpressionAttributeNames: {
        '#a': 'answer',
        '#s': 'status',
        '#e': 'reportsEnd',
        '#v': 'processed',
        '#r': 'reports',
        '#rd': 'reported',
      },
      ExpressionAttributeValues: {
        ':a': answer,
        ':s': status,
        ':z': 0,
      },
      ReturnValues: 'ALL_NEW',
    })
    .then(R.prop('Attributes'))
}

export type ReplyAggReportInput = {
  data: YiguanaDocumentHash
  entity: Extract<EEntity, EEntity.Post | EEntity.Comment>
  answer: string
  status: EEntityStatus
}
