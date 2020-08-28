import {logStoreDdb} from '../../../../lib/log'

export function del<T extends Yiguana.Document>(tableName: string, input: Yiguana.Document) {
  logStoreDdb('del input %j', input)

  return {
    ReturnConsumedCapacity: 'TOTAL',
    ReturnValues: 'ALL_OLD',
    TableName: tableName,
    Key: {
      hk: input.hk,
      rk: input.rk,
    },
  }
}