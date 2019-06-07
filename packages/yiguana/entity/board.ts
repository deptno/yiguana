import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client'
import {Omit} from 'ramda'

export function create(params: CreateInput): Board {
  const {client, ...inherit} = params
  const database = {
    type: EEngine.DynamoDb,
    engine: DynamoDbEngine.createDynamoDbEngine({
      tableName: params.tableName,
      boardName: params.name,
      client
    })
  }
  return {
    ...inherit,
    database,
  }
}

export type Board = Omit<CreateInput, 'client'> & {
  database: {
    type: EEngine
    engine: Engine
  }
}
type CreateInput = {
  name: string
  tableName: string
  client: DocumentClient
}

