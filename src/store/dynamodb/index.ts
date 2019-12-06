import {DynamoDBInput} from '../../entity/input/dynamodb'
import {getPostsByCategory, PostsByCategoryInput} from './get-posts-by-category'
import {removePost, RemovePostInput} from './remove-post'
import {viewPost, ViewPostInput} from './view-post'
import {likePost, LikePostInput} from './like-post'
import {unlikePost, UnlikePostInput} from './unlike-post'
import {del, RemoveStoreInput} from './del'
import {getComments, CommentsInput} from './get-comments'
import {removeComment, RemoveCommentInput} from './remove-comment'
import {commentPost, CommentPostInput} from './comment-post'
import {getPostsByUserId, PostsByUserIdInput} from './get-posts-by-user-id'
import {getPostsByUserLike, PostsByUserLikeInput} from './get-posts-by-user-like'
import {getCommentsByUserId, CommentsByUserIdInput} from './get-comments-by-user-id'
import {updateComment, UpdateCommentInput} from './update-comment'
import {likeComment, LikeCommentInput} from './like-comment'
import {unlikeComment, UnlikeCommentInput} from './unlike-comment'
import {addLike, AddLikeInput} from './add-like'
import {get, GetStoreInput} from './get'
import {removeLike, RemoveLikeInput} from './remove-like'
import {likeReply, LikeReplyInput} from './like-reply'
import {getCommentsByUserLike, CommentsByUserLikeInput} from './get-comments-by-user-like'
import {getRepliesByUserId, RepliesByUserIdInput} from './get-replies-by-user-id'
import {getPosts, PostsInput} from './get-posts'
import {report, ReportInput} from './report'
import {increaseReportAgg, IncreaseReportAggInput} from './increase-report-agg'
import {decreaseReportAgg, DecreaseReportAggInput} from './decrease-report-agg'
import {getAggReports, AggReportsInput} from './get-agg-reports'
import {getReports, ReportsInput} from './get-reports'
import {aggReportReply, AggReportReplyInput} from './agg-report-reply'
import {reportReply, ReportReplyInput} from './report-reply'
import {logStoreDdb} from '../../lib/log'
import {getReportsAll, ReportsAllInput} from './get-reports-all'
import {update, UpdateStoreInput} from './update'
import {ReportByUserInput, getReportsByUser} from './get-reports-by-user'
import {put, PutStoreInput} from './put'
import {YiguanaDocument} from '../../type'

export class MetadataStore {
  constructor(private operator: DynamoDBInput) {

  }

  getPosts(input: PostsInput) {
    return getPosts(this.operator, input)
  }

  getPostsByCategory(input: PostsByCategoryInput) {
    logStoreDdb('getPostsByCategory', input)
    return getPostsByCategory(this.operator, input)
  }

  getPostsByUserId(input: PostsByUserIdInput) {
    logStoreDdb('getPostsByUserId', input)
    return getPostsByUserId(this.operator, input)
  }

  getPostsByUserLike(input: PostsByUserLikeInput) {
    logStoreDdb('getPostsByUserLike', input)
    return getPostsByUserLike(this.operator, input)
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

  getComments(input: CommentsInput) {
    logStoreDdb('getComments', input)
    return getComments(this.operator, input)
  }

  getCommentsByUserId(input: CommentsByUserIdInput) {
    logStoreDdb('getCommentsByUserId', input)
    return getCommentsByUserId(this.operator, input)
  }

  getCommentsByUserLike(input: CommentsByUserLikeInput) {
    logStoreDdb('getCommentsByUserLike', input)
    return getCommentsByUserLike(this.operator, input)
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

  getRepliesByUserId(input: RepliesByUserIdInput) {
    logStoreDdb('getRepliesByUserId', input)
    return getRepliesByUserId(this.operator, input)
  }

  // todo replace
  likeReply(input: LikeReplyInput) {
    logStoreDdb('likeReply', input)
    return likeReply(this.operator, input)
  }

  getAggReports(input: AggReportsInput) {
    logStoreDdb('getAggReports', input)
    return getAggReports(this.operator, input)
  }

  aggReportReply(input: AggReportReplyInput) {
    logStoreDdb('getRggReportReply', input)
    return aggReportReply(this.operator, input)
  }

  reportReply(input: ReportReplyInput) {
    logStoreDdb('reportReply', input)
    return reportReply(this.operator, input)
  }

  getReportsAll(input: ReportsAllInput) {
    logStoreDdb('getReportsAll', input)
    return getReportsAll(this.operator, input)
  }

  getReports(input: ReportsInput) {
    logStoreDdb('getReports', input)
    return getReports(this.operator, input)
  }

  getReportsByUser(input: ReportByUserInput) {
    logStoreDdb('getReportsByUser', input)
    return getReportsByUser(this.operator, input)
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

