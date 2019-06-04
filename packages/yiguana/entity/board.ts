import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client'
import {Omit} from 'ramda'
import {Post} from './post'
import {EEngine, Engine} from '../engine/engine'
import * as DynamoDbEngine from '../engine/db/dynamodb'
import {ListInput} from '../engine/db/list'

export function create(params: CreateInput): Board {
  const {client, ...inherit} = params
  let database = {
    type: EEngine.DynamoDb,
    engine: DynamoDbEngine.create({
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
export async function list(params: ListParams) {
  const {board, ...input} = params
  return board.database.engine.list(input)
}
export function add(params: AddInput) {
  return params.board.database.engine.addPost(params.post)
}

type CreateInput = {
  name: string
  tableName: string
  client: DocumentClient
}
type ListParams = {
  board: Board
} & ListInput
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

