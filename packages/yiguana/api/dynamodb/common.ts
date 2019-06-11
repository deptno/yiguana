import {Post} from '../../entity/post'
import {User} from '../../entity/user'
import {Comment} from '../../entity/comment'
import {DocumentClient} from 'aws-sdk/clients/dynamodb'
import {CommentReply} from '../../entity/comment-reply'

export enum EType {
  Board = 'board',
  Post  = 'post',
  User  = 'user',
  Comment = 'comment',
  CommentReply = 'commentReply',
}
export enum EIndexName {
  BoardOrderIndex = 'board-order-index',
  UserOrderIndex  = 'userId-index',
  PostOrderIndex  = 'postId-index',
  CommentCreatedAtIndex  = 'commentId-index'
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
export type PostIndex = {
  postId: string // hash
  range: EType.Comment | string
  order: string // range
} & TableIndex
export type CommentIndex = {
  postId: string // hash
  range: EType.CommentReply | string
  createdAt: string // range
} & TableIndex

export type DdbCategoryDocument<T> = T & CategoryIndex
export type DdbUserDocument<T> = T & UserIndex
export type DdbCommentDocument<T> = T & PostIndex
export type DdbCommentReplyDocument<T> = T & CommentIndex
export type PostDocument = DdbCategoryDocument<Post>
export type UserDocument = DdbUserDocument<User>
export type CommentDocument = DdbCommentDocument<Comment>
export type CommentReplyDocument = DdbCommentReplyDocument<CommentReply>

export type DynamoDbApiInput = {
  client: DocumentClient
  tableName: string
}
type DdbDocument<T> = T & TableIndex

