import * as R from 'ramda'
import {{dynamodb, tableName}} from '..//input/dynamodb'
import {keys} from '../../../../dynamodb/keys'
import {logStoreDdb} from '../../../../lib/log'

export function replyAggReport(operator: {dynamodb, tableName}, input: ReplyAggReportInput) {
  logStoreDdb('getRggReportReply input %j', input)

  const {data: {hk}, entity, answer, status} = input

  return operator.dynamodb
    .update({
      TableName: operator.tableName,
      Key: {
        hk,
        rk: keys.rk.agg.stringify({
          agg: Yiguana.EntityType.Agg,
          type: Yiguana.EntityType.Report,
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
    .then(response => response.Attributes)
}

export type ReplyAggReportInput = {
  data: Yiguana.Document
  entity: Extract<Yiguana.EntityType, Yiguana.EntityType.Post | Yiguana.EntityType.Comment>
  answer: string
  status: Yiguana.EntityStatusType
}
