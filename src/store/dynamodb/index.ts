import {DynamoDBInput} from '../../entity/input/dynamodb'
import {postsByCategory, PostsByCategoryInput} from './posts-by-category'
import {removePost, RemovePostInput} from './remove-post'
import {viewPost, ViewPostInput} from './view-post'
import {likePost, LikePostInput} from './like-post'
import {unlikePost, UnlikePostInput} from './unlike-post'
import {del, RemoveStoreInput} from './del'
import {comments, CommentsInput} from './comments'
import {removeComment, RemoveCommentInput} from './remove-comment'
import {commentPost, CommentPostInput} from './comment-post'
import {postsByUserId, PostsByUserIdInput} from './posts-by-user-id'
import {postsByUserLike, PostsByUserLikeInput} from './posts-by-user-like'
import {commentsByUserId, CommentsByUserIdInput} from './comments-by-user-id'
import {updateComment, UpdateCommentInput} from './update-comment'
import {likeComment, LikeCommentInput} from './like-comment'
import {unlikeComment, UnlikeCommentInput} from './unlike-comment'
import {addLike, AddLikeInput} from './add-like'
import {get, GetStoreInput} from './get'
import {removeLike, RemoveLikeInput} from './remove-like'
import {likeReply, LikeReplyInput} from './like-reply'
import {commentsByUserLike, CommentsByUserLikeInput} from './comments-by-user-like'
import {repliesByUserId, RepliesByUserIdInput} from './replies-by-user-id'
import {posts, PostsInput} from './posts'
import {report, ReportInput} from './report'
import {increaseReportAgg, IncreaseReportAggInput} from './increase-report-agg'
import {decreaseReportAgg, DecreaseReportAggInput} from './decrease-report-agg'
import {aggReports, AggReportsInput} from './agg-reports'
import {reports, ReportsInput} from './reports'
import {aggReportReply, AggReportReplyInput} from './agg-report-reply'
import {reportReply, ReportReplyInput} from './report-reply'
import {logStoreDdb} from '../../lib/log'
import {reportsAll, ReportsAllInput} from './reports-all'
import {update, UpdateStoreInput} from './update'
import {ReportByUserInput, reportsByUser} from './reports-by-user'
import {put, PutStoreInput} from './put'
import {YiguanaDocument} from '../../type'

export class MetadataStore {
  constructor(private operator: DynamoDBInput) {

  }

  posts(input: PostsInput) {
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

  removePost(input: RemovePostInput) {
    logStoreDdb('removePost', input)
    return removePost(this.operator, input)
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

  repliesByUserId(input: RepliesByUserIdInput) {
    logStoreDdb('repliesByUserId', input)
    return repliesByUserId(this.operator, input)
  }

  // todo replace
  likeReply(input: LikeReplyInput) {
    logStoreDdb('likeReply', input)
    return likeReply(this.operator, input)
  }

  aggReports(input: AggReportsInput) {
    logStoreDdb('aggReports', input)
    return aggReports(this.operator, input)
  }

  aggReportReply(input: AggReportReplyInput) {
    logStoreDdb('aggReportReply', input)
    return aggReportReply(this.operator, input)
  }

  reportReply(input: ReportReplyInput) {
    logStoreDdb('reportReply', input)
    return reportReply(this.operator, input)
  }

  reportsAll(input: ReportsAllInput) {
    logStoreDdb('reportsAll', input)
    return reportsAll(this.operator, input)
  }

  reports(input: ReportsInput) {
    logStoreDdb('reports', input)
    return reports(this.operator, input)
  }

  reportsByUser(input: ReportByUserInput) {
    logStoreDdb('reports', input)
    return reportsByUser(this.operator, input)
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

  put<T extends YiguanaDocument>(input: PutStoreInput) {
    logStoreDdb('put', input)
    return put<T>(this.operator, input)
  }

  get<T extends YiguanaDocument>(input: GetStoreInput) {
    logStoreDdb('get', input)
    return get<T>(this.operator, input)
  }

  update<T extends YiguanaDocument>(input: UpdateStoreInput) {
    logStoreDdb('update', input)
    return update<T>(this.operator, input)
  }

  remove<T extends YiguanaDocument>(input: RemoveStoreInput) {
    logStoreDdb('remove', input)
    return del<T>(this.operator, input)
  }
}

