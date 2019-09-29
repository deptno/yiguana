import {Comment} from '../../entity/dynamodb/comment'
import {createDynamoDB} from '@deptno/dynamodb'
import {createS3} from '@deptno/s3'
import {User} from '../../entity/system'
import {Post, Reply} from '../../entity/dynamodb'

export enum EType {
  Post = 'post',
  User = 'user',
  Comment = 'comment',
  CommentReply = 'comment-reply',
}
export enum EIndexName {
  RkCategory = 'rk-category-index',
  BoardOrder = 'board-order-index',
  UserOrder = 'userId-order-index',
  PostOrder = 'postId-order-index',
  CommentCreatedAt = 'commentId-createdAt-index'
}
export type TableIndex = {
  hk: string // hash
  rk: string // range
}
export type CategoryIndex = {
  category: string // hash
  rk: EType.Post | string
} & TableIndex
export type UserIndex = {
  authorId: string // hash
  order: string // range
} & TableIndex
export type PostIndex = {
  postId: string // hash
  rk: EType.Comment | string
  order: string // range
} & TableIndex
export type CommentIndex = {
  postId: string // hash
  rk: EType.CommentReply | string
  createdAt: string // range
} & TableIndex

export type DdbCategoryDocument<T> = T & CategoryIndex
export type DdbUserDocument<T> = T & UserIndex
export type DdbCommentDocument<T> = T & PostIndex
//export type DdbCommentReplyDocument<T> = T & CommentIndex
export type PostDocument = DdbCategoryDocument<Post>
export type UserDocument = DdbUserDocument<User>
export type CommentDocument = DdbCommentDocument<Comment>
//export type CommentReplyDocument = DdbCommentReplyDocument<Reply>

export type DynamoDBInput = {
  dynamodb: ReturnType<typeof createDynamoDB>
  tableName: string
}
type DdbDocument<T> = T & TableIndex

