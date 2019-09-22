import {posts, PostsInput} from './posts'
import {CreateApiInput} from './common'
import {addPost, AddPostInput} from './add-post'
import {removePost, RemovePostInput} from './remove-post'
import {viewPost, ViewPostInput} from './view-post'
import {likePost, LikePostInput} from './like-post'
import {remove, RemoveInput} from './remove'
import {addComment, AddCommentInput} from './add-comment'
import {comments, CommentsInput} from './comments'
import {removeComment, RemoveCommentInput} from './remove-comment'
import {addCommentReply, AddCommentReplyInput} from './add-comment-reply'
import {commentPost, CommentPostInput} from './comment-post'
import {replyComment, ReplyCommentInput} from './reply-comment'
import {commentReplies, CommentRepliesInput} from './comment-replies'
import {postsByUserId, PostsByUserIdInput} from './post-by-user-id'
import {PaginationResult} from '@deptno/dynamodb/dist/api/query'

export function createApi<P>(operator: CreateApiInput): YiguanaApi<P> {
  return {
    posts: posts.bind(null, operator),
    postsByUserId: postsByUserId.bind(null, operator),
    addPost: addPost.bind(null, operator),
    removePost: removePost.bind(null, operator),
    viewPost: viewPost.bind(null, operator),
    likePost: likePost.bind(null, operator),
    commentPost: commentPost.bind(null, operator),
    comments: comments.bind(null, operator),
    addComment: addComment.bind(null, operator),
    replyComment: replyComment.bind(null, operator),
    commentReplies: commentReplies.bind(null, operator),
    addCommentReply: addCommentReply.bind(null, operator),
    removeComment: removeComment.bind(null, operator),
    remove: remove.bind(null, operator),
  }
}

interface YiguanaApi<P> {
  // board
  posts(params: PostsInput): Promise<PaginationResult<P>>
  postsByUserId(params: PostsByUserIdInput): ReturnType<typeof postsByUserId>
  addPost(params: AddPostInput): ReturnType<typeof addPost>
  removePost(params: RemovePostInput): ReturnType<typeof removePost>

  // post
  viewPost(params: ViewPostInput): ReturnType<typeof viewPost>
  likePost(params: LikePostInput): ReturnType<typeof likePost>
  commentPost(params: CommentPostInput): ReturnType<typeof commentPost>

  // comment
  comments(params: CommentsInput): ReturnType<typeof comments>
  addComment(params: AddCommentInput): ReturnType<typeof addComment>
  replyComment(params: ReplyCommentInput): ReturnType<typeof replyComment>

  // comment replies
  commentReplies(params: CommentRepliesInput): ReturnType<typeof commentReplies>
  addCommentReply(params: AddCommentReplyInput): ReturnType<typeof addCommentReply>
  removeComment(params: RemoveCommentInput): ReturnType<typeof removeComment>

  // common
  remove(params: RemoveInput): ReturnType<typeof remove>
}

