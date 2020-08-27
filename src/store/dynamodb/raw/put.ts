import {{dynamodb, tableName}} from '../..//input/dynamodb'
import {logStoreDdb} from '../../../lib/log'

export async function put<T extends Yiguana.Document>(operator: {dynamodb, tableName}, input: PutStoreInput): Promise<T> {
  logStoreDdb('put input %j', input)

  const {dynamodb, tableName} = operator

  return dynamodb.put<T>({
    TableName: tableName,
    Item: dynamodb.util.js2DdbDoc(input),
    ReturnValues: 'ALL_OLD',
  })
}

export type PutStoreInput = Yiguana.Document
