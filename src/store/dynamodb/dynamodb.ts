import {posts, PostsInput} from './posts'
import {addPost, AddPostInput} from './add-post'
import {updatePost, UpdatePostInput} from './update-post'
import {removePost, RemovePostInput} from './remove-post'
import {viewPost, ViewPostInput} from './view-post'
import {likePost, LikePostInput} from './like-post'
import {remove, RemoveInput} from './remove'
import {addComment, AddCommentInput} from './add-comment'
import {comments, CommentsInput} from './comments'
import {removeComment, RemoveCommentInput} from './remove-comment'
import {addReply, AddCommentReplyInput} from './add-reply'
import {commentPost, CommentPostInput} from './comment-post'
import {reply, ReplyInput} from './reply'
import {replies, RepliesInput} from './replies'
import {postsByUserId, PostsByUserIdInput} from './posts-by-user-id'
import {PaginationResult} from '@deptno/dynamodb/dist/api/query'
import {post, PostInput} from './post'
import {DynamoDBInput} from '../../entity/input/dynamodb'
import {commentsByUserId, CommentsByUserIdInput} from './comments-by-user-id'
import {unlikePost} from './unlike-post'
import {updateComment, UpdateCommentInput} from './update-comment'
import {likeComment, LikeCommentInput} from './like-comment'
import {unlikeComment, UnlikeCommentInput} from './unlike-comment'
import {Post} from '../../entity/post'

export function createStore<P>(operator: DynamoDBInput): YiguanaStore {
  return {
    post: post.bind(null, operator),
    posts: posts.bind(null, operator),
    postsByUserId: postsByUserId.bind(null, operator),
    addPost: addPost.bind(null, operator),
    updatePost: updatePost.bind(null, operator),
    removePost: removePost.bind(null, operator),
    viewPost: viewPost.bind(null, operator),
    likePost: likePost.bind(null, operator),
    unlikePost: unlikePost.bind(null, operator),
    commentPost: commentPost.bind(null, operator),
    comments: comments.bind(null, operator),
    commentsByUserId: commentsByUserId.bind(null, operator),
    addComment: addComment.bind(null, operator),
    updateComment: updateComment.bind(null, operator),
    removeComment: removeComment.bind(null, operator),
    likeComment: likeComment.bind(null, operator),
    unlikeComment: unlikeComment.bind(null, operator),
    replyComment: reply.bind(null, operator),
    replies: replies.bind(null, operator),
    addReply: addReply.bind(null, operator),
    remove: remove.bind(null, operator),
  }
}

export interface YiguanaStore {
  // board
  post(params: PostInput): ReturnType<typeof post>
  posts(params: PostsInput): Promise<PaginationResult<Post>>
  postsByUserId(params: PostsByUserIdInput): ReturnType<typeof postsByUserId>
  addPost(params: AddPostInput): ReturnType<typeof addPost>
  removePost(params: RemovePostInput): ReturnType<typeof removePost>

  // post
  updatePost(params: UpdatePostInput): ReturnType<typeof updatePost>
  viewPost(params: ViewPostInput): ReturnType<typeof viewPost>
  likePost(params: LikePostInput): ReturnType<typeof likePost>
  unlikePost(params: LikePostInput): ReturnType<typeof likePost>
  commentPost(params: CommentPostInput): ReturnType<typeof commentPost>

  // comment
  comments(params: CommentsInput): ReturnType<typeof comments>
  commentsByUserId(params: CommentsByUserIdInput): ReturnType<typeof commentsByUserId>
  addComment(params: AddCommentInput): ReturnType<typeof addComment>
  updateComment(params: UpdateCommentInput): ReturnType<typeof updateComment>
  removeComment(params: RemoveCommentInput): ReturnType<typeof removeComment>
  likeComment(params: LikeCommentInput): ReturnType<typeof likeComment>
  unlikeComment(params: UnlikeCommentInput): ReturnType<typeof unlikeComment>
  replyComment(params: ReplyInput): ReturnType<typeof reply>

  // reply replies
  replies(params: RepliesInput): ReturnType<typeof replies>
  addReply(params: AddCommentReplyInput): ReturnType<typeof addReply>

  // common
  remove(params: RemoveInput): ReturnType<typeof remove>
}

