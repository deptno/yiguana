import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client'
import {Omit} from 'ramda'
import {Post} from './post'
import {EEngine, Engine} from '../engine/engine'
import * as DynamoDbEngine from '../engine/db/dynamodb'
import {ListInput} from '../engine/db/list'
import {PostDocument} from '../engine/db/document'

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
export function remove(params: RemoveInput) {
  return params.board.database.engine.removePost(params.id)
}
export function view(params: ViewInput) {
  return params.board.database.engine.viewPost(params.post)
}
export function like(params: ViewInput) {
  return params.board.database.engine.likePost(params.post)
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
type ListParams = {
  board: Board
} & ListInput

type AddInput = {
  board: Board
  post: Post
}
type RemoveInput = {
  board: Board
  id: string
}
type ViewInput = {
  board: Board
  post: PostDocument
}

