import {Post} from '../../entity/post'
import {User} from '../../entity/user'
import {DocumentClient} from 'aws-sdk/clients/dynamodb'

export enum EType {
  Board = 'board',
  Post  = 'post',
  User  = 'user',
  Reply = 'reply',
}
export enum EIndexName {
  BoardOrderIndex = 'board-order-index',
  UserOrderIndex  = 'userId-index'
}
export type TableIndex = {
  id: string // hash
  range: string // range
  _type: EType
}
export type CategoryIndex = {
  category: string // hash
  order: string // range
} & TableIndex
export type UserIndex = {
  authorId: string // hash
  order: string // range
} & TableIndex

export type DdbCategoryDocument<T> = T & CategoryIndex
export type DdbUserDocument<T> = T & UserIndex
export type PostDocument = DdbCategoryDocument<Post>
export type UserDocument = DdbUserDocument<User>

export type DynamoDbApiInput = {
  client: DocumentClient
  tableName: string
}
type DdbDocument<T> = T & TableIndex

