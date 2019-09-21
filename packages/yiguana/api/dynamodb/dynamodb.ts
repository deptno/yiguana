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

export function createApi(operator: CreateApiInput) {
  return {
    // board
    posts: posts.bind(null, operator) as (params: PostsInput) => ReturnType<typeof posts>,
    postsByUserId: postsByUserId.bind(null, operator) as (params: PostsByUserIdInput) => ReturnType<typeof postsByUserId>,
    addPost: addPost.bind(null, operator) as (params: AddPostInput) => ReturnType<typeof addPost>,
    removePost: removePost.bind(null, operator) as (params: RemovePostInput) => ReturnType<typeof removePost>,
    // post
    viewPost: viewPost.bind(null, operator) as (params: ViewPostInput) => ReturnType<typeof viewPost>,
    likePost: likePost.bind(null, operator) as (params: LikePostInput) => ReturnType<typeof likePost>,
    commentPost: commentPost.bind(null, operator) as (params: CommentPostInput) => ReturnType<typeof commentPost>,
    // comment
    comments: comments.bind(null, operator) as (params: CommentsInput) => ReturnType<typeof comments>,
    addComment: addComment.bind(null, operator) as (params: AddCommentInput) => ReturnType<typeof addComment>,
    replyComment: replyComment.bind(null, operator) as (params: ReplyCommentInput) => ReturnType<typeof replyComment>,
    // comment replies
    commentReplies: commentReplies.bind(null, operator) as (params: CommentRepliesInput) => ReturnType<typeof commentReplies>,
    addCommentReply: addCommentReply.bind(null, operator) as (params: AddCommentReplyInput) => ReturnType<typeof addCommentReply>,
    removeComment: removeComment.bind(null, operator) as (params: RemoveCommentInput) => ReturnType<typeof removeComment>,
    // common
    remove: remove.bind(null, operator) as (params: RemoveInput) => ReturnType<typeof remove>,
  }
}
