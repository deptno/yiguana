import {logStoreDdb} from '../../../../lib/log'

export async function put<T extends Yiguana.Document>(tableName: string, input: Yiguana.Document) {
  logStoreDdb('put input %j', input)

  // fixme: dynamodb.util.js2DdbDoc(input),
  return {
    TableName: tableName,
    Item: input,
    ReturnValues: 'ALL_OLD',
  }
}

