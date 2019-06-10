import {Post} from '../../entity/post'
import {User} from '../../entity/user'
import {Comment} from '../../entity/comment'
import {DocumentClient} from 'aws-sdk/clients/dynamodb'

export enum EType {
  Board = 'board',
  Post  = 'post',
  User  = 'user',
  Comment = 'comment',
}
export enum EIndexName {
  BoardOrderIndex = 'board-order-index',
  UserOrderIndex  = 'userId-index',
  CommentOrderIndex  = 'postId-index'
}
export type TableIndex = {
  id: string // hash
  range: string // range
  _type: EType
}
export type CategoryIndex = {
  category: string // hash
  range: EType.Post | string
  order: string // range
} & TableIndex
export type UserIndex = {
  authorId: string // hash
  order: string // range
} & TableIndex
export type CommentIndex = {
  postId: string // hash
  range: EType.Comment | string
  order: string // range
} & TableIndex

export type DdbCategoryDocument<T> = T & CategoryIndex
export type DdbUserDocument<T> = T & UserIndex
export type DdbCommentDocument<T> = T & CommentIndex
export type PostDocument = DdbCategoryDocument<Post>
export type UserDocument = DdbUserDocument<User>
export type CommentDocument = DdbCommentDocument<Comment>

export type DynamoDbApiInput = {
  client: DocumentClient
  tableName: string
}
type DdbDocument<T> = T & TableIndex

