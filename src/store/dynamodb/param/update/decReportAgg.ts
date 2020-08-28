import {keys} from '../../../../dynamodb/keys'
import {logStoreDdb} from '../../../../lib/log'

export function decReportAgg(tableName: string, input: Input) {
  logStoreDdb('decReportCount input %j', input)

  const {hk, rk} = input

  return {
    TableName: tableName,
    Key: {
      hk,
      rk: keys.rk.agg.stringify({
        agg: Yiguana.EntityType.Agg,
        type: Yiguana.EntityType.Report,
        target: rk, // Yiguana.EntityType.Post|Yiguana.EntityType.Comment 인 것이 보장되어야 한다.
      }),
    },
    UpdateExpression: 'SET #v = #v + :v',
    ExpressionAttributeNames: {
      '#v': 'reported',
    },
    ExpressionAttributeValues: {
      ':v': -1,
    },
    // todo: condition #v > 0
    ReturnValues: 'ALL_NEW',
  }
}

type Input =
  | Yiguana.PostDocument
  | Yiguana.CommentDocument
  | Yiguana.ReplyDocument