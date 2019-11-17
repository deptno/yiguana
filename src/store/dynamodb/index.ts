import {DynamoDBInput} from '../../entity/input/dynamodb'
import {postsByCategory, PostsByCategoryInput} from './posts-by-category'
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
import {addReply, AddCommentReplyInput} from './add-reply'
import {commentPost, CommentPostInput} from './comment-post'
import {replies, RepliesInput} from './replies'
import {postsByUserId, PostsByUserIdInput} from './posts-by-user-id'
import {postsByUserLike, PostsByUserLikeInput} from './posts-by-user-like'
import {post, PostInput} from './post'
import {commentsByUserId, CommentsByUserIdInput} from './comments-by-user-id'
import {updateComment, UpdateCommentInput} from './update-comment'
import {likeComment, LikeCommentInput} from './like-comment'
import {unlikeComment, UnlikeCommentInput} from './unlike-comment'
import {updateReply, UpdateCommentReplyInput} from './update-reply'
import {removeReply, RemoveCommentReplyInput} from './remove-reply'
import {addLike, AddLikeInput} from './add-like'
import {getLike, GetLikeInput} from './get-like'
import {get, GetInput} from './get'
import {removeLike, RemoveLikeInput} from './remove-like'
import {likeReply, LikeReplyInput} from './like-reply'
import {unlikeReply, UnlikeReplyInput} from './unlike-reply'
import {commentsByUserLike, CommentsByUserLikeInput} from './comments-by-user-like'
import {repliesByUserId, RepliesByUserIdInput} from './replies-by-user-id'
import {repliesByUserLike, RepliesByUserLikeInput} from './replies-by-user-like'
import {posts, PostsInput} from './posts'
import {comment, CommentInput} from './comment'
import {report, ReportInput} from './report'
import {increaseReportAgg, IncreaseReportAggInput} from './increase-report-agg'
import {decreaseReportAgg, DecreaseReportAggInput} from './decrease-report-agg'
import {reports, ReportsInput} from './reports'
import {logStoreDdb} from '../../lib/log'
import {postsByUserReport, PostsByUserReportInput} from './posts-by-user-report'
import {CommentsByUserReportInput, commentsByUserReport} from './comments-by-user-report'

export class MetadataStore {
  constructor(private operator: DynamoDBInput) {

  }

  post(input: PostInput) {
    logStoreDdb('post', input)
    return post(this.operator, input)
  }

  posts(input: PostsInput) {
    logStoreDdb('posts', input)
    return posts(this.operator, input)
  }

  postsByCategory(input: PostsByCategoryInput) {
    logStoreDdb('postsByCategory', input)
    return postsByCategory(this.operator, input)
  }

  postsByUserId(input: PostsByUserIdInput) {
    logStoreDdb('postsByUserId', input)
    return postsByUserId(this.operator, input)
  }

  postsByUserLike(input: PostsByUserLikeInput) {
    logStoreDdb('postsByUserLike', input)
    return postsByUserLike(this.operator, input)
  }

  postsByUserReport(input: PostsByUserReportInput) {
    logStoreDdb('postsByUserReport', input)
    return postsByUserReport(this.operator, input)
  }

  addPost(input: AddPostInput) {
    logStoreDdb('addPost', input)
    return addPost(this.operator, input)
  }

  removePost(input: RemovePostInput) {
    logStoreDdb('removePost', input)
    return removePost(this.operator, input)
  }

  updatePost(input: UpdatePostInput) {
    logStoreDdb('updatePost', input)
    return updatePost(this.operator, input)
  }

  viewPost(input: ViewPostInput) {
    logStoreDdb('viewPost', input)
    return viewPost(this.operator, input)
  }

  likePost(input: LikePostInput) {
    logStoreDdb('likePost', input)
    return likePost(this.operator, input)
  }

  unlikePost(input: UnlikePostInput) {
    logStoreDdb('unlikePost', input)
    return unlikePost(this.operator, input)
  }

  commentPost(input: CommentPostInput) {
    logStoreDdb('commentPost', input)
    return commentPost(this.operator, input)
  }

  comment(input: CommentInput) {
    logStoreDdb('comment', input)
    return comment(this.operator, input)
  }

  comments(input: CommentsInput) {
    logStoreDdb('comments', input)
    return comments(this.operator, input)
  }

  commentsByUserId(input: CommentsByUserIdInput) {
    logStoreDdb('commentsByUserId', input)
    return commentsByUserId(this.operator, input)
  }

  commentsByUserLike(input: CommentsByUserLikeInput) {
    logStoreDdb('commentsByUserLike', input)
    return commentsByUserLike(this.operator, input)
  }

  commentsByUserReport(input: CommentsByUserReportInput) {
    logStoreDdb('commentsByUserReport', input)
    return commentsByUserReport(this.operator, input)
  }

  addComment(input: AddCommentInput) {
    logStoreDdb('addComment', input)
    return addComment(this.operator, input)
  }

  updateComment(input: UpdateCommentInput) {
    logStoreDdb('updateComment', input)
    return updateComment(this.operator, input)
  }

  removeComment(input: RemoveCommentInput) {
    logStoreDdb('removeComment', input)
    return removeComment(this.operator, input)
  }

  addLike(input: AddLikeInput) {
    logStoreDdb('addLike', input)
    return addLike(this.operator, input)
  }

  removeLike(input: RemoveLikeInput) {
    logStoreDdb('removeLike', input)
    return removeLike(this.operator, input)
  }

  likeComment(input: LikeCommentInput) {
    logStoreDdb('likeComment', input)
    return likeComment(this.operator, input)
  }

  unlikeComment(input: UnlikeCommentInput) {
    logStoreDdb('unlikeComment', input)
    return unlikeComment(this.operator, input)
  }

  replies(input: RepliesInput) {
    logStoreDdb('replies', input)
    return replies(this.operator, input)
  }

  repliesByUserId(input: RepliesByUserIdInput) {
    logStoreDdb('repliesByUserId', input)
    return repliesByUserId(this.operator, input)
  }

  repliesByUserLike(input: RepliesByUserLikeInput) {
    logStoreDdb('repliesByUserLike', input)
    return repliesByUserLike(this.operator, input)
  }

  addReply(input: AddCommentReplyInput) {
    logStoreDdb('addReply', input)
    return addReply(this.operator, input)
  }

  updateReply(input: UpdateCommentReplyInput) {
    logStoreDdb('updateReply', input)
    return updateReply(this.operator, input)
  }

  removeReply(input: RemoveCommentReplyInput) {
    logStoreDdb('removeReply', input)
    return removeReply(this.operator, input)
  }

  likeReply(input: LikeReplyInput) {
    logStoreDdb('likeReply', input)
    return likeReply(this.operator, input)
  }

  unlikeReply(input: UnlikeReplyInput) {
    logStoreDdb('unlikeReply', input)
    return unlikeReply(this.operator, input)
  }

  // 일단 유지한다. upsert 로직이 결국 원본 객체를 필요로해서 의미가 많이 퇴색되었기 때문
  // @deprecated
  getLike(input: GetLikeInput) {
    logStoreDdb('getLike', input)
    return getLike(this.operator, input)
  }

  reports(input: ReportsInput) {
    logStoreDdb('reports', input)
    return reports(this.operator, input)
  }

  report(input: ReportInput) {
    logStoreDdb('report', input)
    return report(this.operator, input)
  }

  increaseReportCount(input: IncreaseReportAggInput) {
    logStoreDdb('increaseReportCount', input)
    return increaseReportAgg(this.operator, input)
  }

  decreaseReportCount(input: DecreaseReportAggInput) {
    logStoreDdb('decreaseReportCount', input)
    return decreaseReportAgg(this.operator, input)
  }

  get(input: GetInput) {
    logStoreDdb('get', input)
    return get(this.operator, input)
  }
  remove(input: RemoveInput) {
    logStoreDdb('remove', input)
    return remove(this.operator, input)
  }
}

