import {DynamoDBInput} from '../../entity/input/dynamodb'
import {YiguanaDocument, YiguanaDocumentHashRange} from '../../type'

export async function put<T extends YiguanaDocument>(operator: DynamoDBInput, params: PutStoreInput): Promise<T> {
  const {dynamodb, tableName} = operator

  return dynamodb.put<T>({
    TableName: tableName,
    Item: dynamodb.util.js2DdbDoc(params),
    ReturnValues: 'ALL_OLD'
  })
}

export type PutStoreInput = YiguanaDocumentHashRange
