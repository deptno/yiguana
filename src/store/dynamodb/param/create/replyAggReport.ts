import {keys} from '../../../../dynamodb/keys'
import {logStoreDdb} from '../../../../lib/log'

export function replyAggReport(tableName: string, input: Input) {
  logStoreDdb('getRggReportReply input %j', input)

  const {data: {hk}, entity, answer, status} = input

  return {
    TableName: tableName,
    Key: {
      hk,
      rk: keys.rk.agg.stringify({
        agg: Yiguana.EntityType.Agg,
        type: Yiguana.EntityType.Report,
        target: entity,
      }),
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
  }
}

type Input = {
  data: Yiguana.Document
  entity: Extract<Yiguana.EntityType, Yiguana.EntityType.Post | Yiguana.EntityType.Comment>
  answer: string
  status: Yiguana.EntityStatusType
}
