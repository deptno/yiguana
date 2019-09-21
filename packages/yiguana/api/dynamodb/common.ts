import {Post} from '../../entity/post'
import {User} from '../../entity/user'
import {Comment} from '../../entity/comment'
import {DocumentClient} from 'aws-sdk/clients/dynamodb'
import {CommentReply} from '../../entity/comment-reply'
import {S3} from 'aws-sdk'
import {createDynamoDB} from '@deptno/dynamodb'
import {createS3} from '@deptno/s3'

export enum EType {
  Post         = 'post',
  User         = 'user',
  Comment      = 'comment',
  CommentReply = 'comment-reply',
}
export enum EIndexName {
  BoardOrderIndex       = 'board-order-index',
  UserOrderIndex        = 'userId-order-index',
  PostOrderIndex        = 'postId-order-index',
  CommentCreatedAtIndex = 'commentId-createdAt-index'
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
export type PostDocument = DdbCategoryDocument<Omit<Post, 'content'> & {
  s3: string
}>
export type UserDocument = DdbUserDocument<User>
export type CommentDocument = DdbCommentDocument<Comment>
export type CommentReplyDocument = DdbCommentReplyDocument<CommentReply>

export type CreateApiInput = {
  dynamodb: ReturnType<typeof createDynamoDB>
  s3: ReturnType<typeof createS3>
  tableName: string
  bucketName: string
}
type DdbDocument<T> = T & TableIndex

