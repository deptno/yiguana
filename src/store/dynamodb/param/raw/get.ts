import {logStoreDdb} from '../../../../lib/log'

export async function get<T extends Yiguana.Document>(tableName: string, input: Yiguana.Document) {
  logStoreDdb('get input %j', input)

  return {
    TableName: tableName,
    Key: {
      hk: input.hk,
      rk: input.rk
    }
  }
}

