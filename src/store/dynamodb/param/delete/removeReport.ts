import {keys} from '../../../../dynamodb/keys'

export function removeReport(tableName: string, params: Input) {
  const {data, userId} = params

  return {
    TableName: tableName,
    Key: {
      hk: data.hk,
      rk: keys.rk.report.stringify({
        entity: Yiguana.EntityType.Report,
        target: data.rk,
        userId: userId,
      }),
    },
    ReturnValues: 'ALL_OLD',
  }
}

type Input = {
  data: Yiguana.Document
  userId: string
}