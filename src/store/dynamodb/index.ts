import {posts, PostsInput} from './posts'
import {addPost, AddPostInput} from './add-post'
import {updatePost, UpdatePostInput} from './update-post'
import {removePost, RemovePostInput} from './remove-post'
import {viewPost, ViewPostInput} from './view-post'
import {likePost, LikePostInput} from './like-post'
import {unlikePost, UnlikePostInput} from './unlike-post'
import {remove, RemoveInput} from './remove'
import {addComment, AddCommentInput} from './add-comment'
import {comments, CommentsInput} from './comments'
import {removeComment, RemoveCommentInput} from './remove-comment'
import {AddCommentReplyInput, addReply} from './add-reply'
import {commentPost, CommentPostInput} from './comment-post'
import {replies, RepliesInput} from './replies'
import {postsByUserId, PostsByUserIdInput} from './posts-by-user-id'
import {post, PostInput} from './post'
import {DynamoDBInput} from '../../entity/input/dynamodb'
import {commentsByUserId, CommentsByUserIdInput} from './comments-by-user-id'
import {updateComment, UpdateCommentInput} from './update-comment'
import {likeComment, LikeCommentInput} from './like-comment'
import {unlikeComment, UnlikeCommentInput} from './unlike-comment'
import {replyComment, ReplyCommentInput} from './reply-comment'
import {UpdateCommentReplyInput, updateReply} from './update-reply'
import {RemoveCommentReplyInput, removeReply} from './remove-reply'

export class MetadataStore {
  constructor(private operator: DynamoDBInput) {

  }

  post(input: PostInput) {
    return post(this.operator, input)
  }

  posts(input: PostsInput) {
    return posts(this.operator, input)
  }

  postsByUserId(input: PostsByUserIdInput) {
    return postsByUserId(this.operator, input)
  }

  addPost(input: AddPostInput) {
    return addPost(this.operator, input)
  }

  removePost(input: RemovePostInput) {
    return removePost(this.operator, input)
  }

  updatePost(input: UpdatePostInput) {
    return updatePost(this.operator, input)
  }

  viewPost(input: ViewPostInput) {
    return viewPost(this.operator, input)
  }

  likePost(input: LikePostInput) {
    return likePost(this.operator, input)
  }

  unlikePost(input: UnlikePostInput) {
    return unlikePost(this.operator, input)
  }

  commentPost(input: CommentPostInput) {
    return commentPost(this.operator, input)
  }

  comments(input: CommentsInput) {
    return comments(this.operator, input)
  }

  commentsByUserId(input: CommentsByUserIdInput) {
    return commentsByUserId(this.operator, input)
  }

  addComment(input: AddCommentInput) {
    return addComment(this.operator, input)
  }

  updateComment(input: UpdateCommentInput) {
    return updateComment(this.operator, input)
  }

  removeComment(input: RemoveCommentInput) {
    return removeComment(this.operator, input)
  }

  likeComment(input: LikeCommentInput) {
    return likeComment(this.operator, input)
  }

  unlikeComment(input: UnlikeCommentInput) {
    return unlikeComment(this.operator, input)
  }

  replyComment(input: ReplyCommentInput) {
    return replyComment(this.operator, input)
  }

  replies(input: RepliesInput) {
    return replies(this.operator, input)
  }

  addReply(input: AddCommentReplyInput) {
    return addReply(this.operator, input)
  }

  updateReply(input: UpdateCommentReplyInput) {
    return updateReply(this.operator, input)
  }

  removeReply(input: RemoveCommentReplyInput) {
    return removeReply(this.operator, input)
  }

  remove(input: RemoveInput) {
    return remove(this.operator, input)
  }
}

