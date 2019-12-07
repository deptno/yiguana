import {DynamoDBInput} from '../../../entity/input/dynamodb'
import {YiguanaDocument, YiguanaDocumentHashRange} from '../../../type'
import {logStoreDdb} from '../../../lib/log'

export async function put<T extends YiguanaDocument>(operator: DynamoDBInput, input: PutStoreInput): Promise<T> {
  logStoreDdb('put input %j', input)

  const {dynamodb, tableName} = operator

  return dynamodb.put<T>({
    TableName: tableName,
    Item: dynamodb.util.js2DdbDoc(input),
    ReturnValues: 'ALL_OLD',
  })
}

export type PutStoreInput = YiguanaDocumentHashRange
