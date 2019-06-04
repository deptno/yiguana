import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client'
import {Omit} from 'ramda'
import {Post} from './post'
import {EEngine, Engine} from '../engine/engine'
import * as DynamoDbEngine from '../engine/db/dynamodb'

export function create(params: CreateInput): Board {
  const {client, ...inherit} = params
  let database = {
    type: EEngine.DynamoDb,
    engine: DynamoDbEngine.create({
      tableName: params.tableName,
      client
    })
  }
  return {
    ...inherit,
    database,
  }
}
export async function list(params: ListInput) {
  return params.board.database.engine.list()
}
export function add(params: AddInput) {
  return params.board.database.engine.addPost(params.post)
}

export type BoardId = string
type CreateInput = {
  name: string
  tableName: string
  client: DocumentClient
}
type ListInput = {
  board: Board
}
type Board = Omit<CreateInput, 'client'> & {
  database: {
    type: EEngine
    engine: Engine
  }
}
type AddInput = {
  board: Board
  post: Post
}

