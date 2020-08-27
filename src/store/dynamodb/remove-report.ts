import {{dynamodb, tableName}} from '..//input/dynamodb'
import {keys} from '../../dynamodb/keys'

export function removeReport(operator: {dynamodb, tableName}, params: RemoveReportInput) {
  const {dynamodb, tableName} = operator
  const {data, userId} = params

  return dynamodb.del(
    {
      TableName: tableName,
      Key: {
        hk: data.hk,
        rk: keys.rk.report.stringify({
          entity: Yiguana.EntityType.Report,
          target: data.rk,
          userId: userId
        }),
      },
      ReturnValues: 'ALL_OLD',
    },
  )
}

export type RemoveReportInput = {
  data: Yiguana.Document
  userId: string
}