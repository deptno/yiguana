import {DynamoDBInput} from '../../entity/input/dynamodb'
import {getPostsByCategory, PostsByCategoryInput} from './get-posts-by-category'
import {removePost, RemovePostInput} from './remove-post'
import {del, RemoveStoreInput} from './raw/del'
import {CommentsInput, getComments} from './get-comments'
import {removeComment, RemoveCommentInput} from './remove-comment'
import {getPostsByUserId, PostsByUserIdInput} from './get-posts-by-user-id'
import {getPostsByUserLike, PostsByUserLikeInput} from './get-posts-by-user-like'
import {CommentsByUserIdInput, getCommentsByUserId} from './get-comments-by-user-id'
import {updateComment, UpdateCommentInput} from './update-comment'
import {addLike, AddLikeInput} from './add-like'
import {get, GetStoreInput} from './raw/get'
import {removeLike, RemoveLikeInput} from './remove-like'
import {CommentsByUserLikeInput, getCommentsByUserLike} from './get-comments-by-user-like'
import {getRepliesByUserId, RepliesByUserIdInput} from './get-replies-by-user-id'
import {getPosts, PostsInput} from './get-posts'
import {putReport, ReportInput} from './put-report'
import {increaseReportAgg, IncreaseReportAggInput} from './increase-report-agg'
import {decreaseReportAgg, DecreaseReportAggInput} from './decrease-report-agg'
import {AggReportsInput, getAggReports} from './get-agg-reports'
import {getReports, ReportsInput} from './get-reports'
import {aggReportReply, AggReportReplyInput} from './agg-report-reply'
import {reportReply, ReportReplyInput} from './report-reply'
import {getReportsAll, ReportsAllInput} from './get-reports-all'
import {update, UpdateStoreInput} from './raw/update'
import {getReportsByUser, ReportByUserInput} from './get-reports-by-user'
import {put, PutStoreInput} from './raw/put'
import {EEntity, YiguanaDocument, YiguanaDocumentHash} from '../../type'
import {incLikes, IncLikesStoreInput} from './inc-likes'
import {decLikes, DecLikesStoreInput} from './dec-likes'
import {incViews} from './inc-views'
import {Comment, Post, Reply} from '../../entity'
import {incChildren} from './inc-children'
import * as R from 'ramda'

export class MetadataStore {
  constructor(private operator: DynamoDBInput) {

  }

  getPosts(input: PostsInput) {
    return getPosts(this.operator, input)
  }

  getPostsByCategory(input: PostsByCategoryInput) {
    return getPostsByCategory(this.operator, input)
  }

  getPostsByUserId(input: PostsByUserIdInput) {
    return getPostsByUserId(this.operator, input)
  }

  getPostsByUserLike(input: PostsByUserLikeInput) {
    return getPostsByUserLike(this.operator, input)
  }

  removePost(input: RemovePostInput) {
    return removePost(this.operator, input)
  }

  viewPost(input: YiguanaDocumentHash) {
    return incViews(this.operator, {hk: input.hk, rk: EEntity.Post} as Post)
  }

  likePost(input: IncLikesStoreInput) {
    return incLikes<Post>(this.operator, input)
  }

  addComment<T extends Comment | Reply>(input: T) {
    return Promise
      .all([
        put(this.operator, input),
        incChildren(this.operator, {
          hk: input.postId,
          rk: EEntity.Post,
        }),
      ])
      .then<T>(R.head)
  }

  getComments(input: CommentsInput) {
    return getComments(this.operator, input)
  }

  getCommentsByUserId(input: CommentsByUserIdInput) {
    return getCommentsByUserId(this.operator, input)
  }

  getCommentsByUserLike(input: CommentsByUserLikeInput) {
    return getCommentsByUserLike(this.operator, input)
  }

  updateComment(input: UpdateCommentInput) {
    return updateComment(this.operator, input)
  }

  removeComment(input: RemoveCommentInput) {
    return removeComment(this.operator, input)
  }

  // todo 3
  addLike(input: AddLikeInput) {
    return addLike(this.operator, input)
  }

  removeLike(input: RemoveLikeInput) {
    return removeLike(this.operator, input)
  }

  incLikes(input: IncLikesStoreInput) {
    return incLikes(this.operator, input)
  }

  decLikes(input: DecLikesStoreInput) {
    return decLikes(this.operator, input)
  }

  getRepliesByUserId(input: RepliesByUserIdInput) {
    return getRepliesByUserId(this.operator, input)
  }

  getAggReports(input: AggReportsInput) {
    return getAggReports(this.operator, input)
  }

  // todo 3
  aggReportReply(input: AggReportReplyInput) {
    return aggReportReply(this.operator, input)
  }

  // todo 3
  reportReply(input: ReportReplyInput) {
    return reportReply(this.operator, input)
  }

  getReportsAll(input: ReportsAllInput) {
    return getReportsAll(this.operator, input)
  }

  getReports(input: ReportsInput) {
    return getReports(this.operator, input)
  }

  getReportsByUser(input: ReportByUserInput) {
    return getReportsByUser(this.operator, input)
  }

  report(input: ReportInput) {
    return putReport(this.operator, input)
  }

  // todo 3
  increaseReportCount(input: IncreaseReportAggInput) {
    return increaseReportAgg(this.operator, input)
  }

  // no use case
  // todo 3
  decreaseReportCount(input: DecreaseReportAggInput) {
    return decreaseReportAgg(this.operator, input)
  }

  // raw 함수들은 래핑을 한번 하는게 좋아보임
  put<T extends YiguanaDocument>(input: PutStoreInput) {
    return put<T>(this.operator, input)
  }

  get<T extends YiguanaDocument>(input: GetStoreInput) {
    return get<T>(this.operator, input)
  }

  update<T extends YiguanaDocument>(input: UpdateStoreInput) {
    return update<T>(this.operator, input)
  }

  del<T extends YiguanaDocument>(input: RemoveStoreInput) {
    return del<T>(this.operator, input)
  }
}

