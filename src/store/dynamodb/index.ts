// TODO: 사용하지 않는 함수 정리 필요

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
import {getPosts, PostsInput} from './get-posts'
import {putReport, ReportInput} from './put-report'
import {incReportAgg, IncReportAggInput} from './inc-report-agg'
import {decReportAgg, DecReportAggInput} from './dec-report-agg'
import {AggReportsInput, getAggReports} from './get-agg-reports'
import {getReports, ReportsInput} from './get-reports'
import {replyAggReport, ReplyAggReportInput} from './reply-agg-report'
import {ReplyReportInput, replyReports} from './reply-reports'
import {getAllReports} from './get-all-reports'
import {update, UpdateStoreInput} from './raw/update'
import {getReportsByUser, ReportByUserInput} from './get-reports-by-user'
import {put, PutStoreInput} from './raw/put'
import {incLikes, IncLikesStoreInput} from './inc-likes'
import {decLikes, DecLikesStoreInput} from './dec-likes'
import {incViews} from './inc-views'
import {incChildren} from './inc-children'
import * as R from 'ramda'

export class MetadataStore {
  constructor(private operator: {dynamodb, tableName}) {

  }

  /**
   * Post 목록을 가져온다.
   * @param {PostsInput} input
   * @returns {Promise<import("./api").PaginationResult<Post>>}
   */
  getPosts(input: PostsInput) {
    return getPosts(this.operator, input)
  }

  /**
   * 카테고리 별 Post 목록을 가져온다.
   * @param {PostsByCategoryInput} input
   * @returns {Promise<import("./api").PaginationResult<Post>>}
   */
  getPostsByCategory(input: PostsByCategoryInput) {
    return getPostsByCategory(this.operator, input)
  }

  /**
   * 유저가 작성한 Post 목록을 가져온다.
   * @param {PostsByUserIdInput} input
   * @returns {Promise<import("./api").PaginationResult<Post>>}
   */
  getPostsByUserId(input: PostsByUserIdInput) {
    return getPostsByUserId(this.operator, input)
  }

  /**
   * 유저가 공감한 Post 목록을 가져온다.
   * @param {PostsByUserLikeInput} input
   * @returns {Promise<{lastEvaluatedKey?: DynamoDB.Key; firstResult?: boolean; items: Post[]}>}
   */
  getPostsByUserLike(input: PostsByUserLikeInput) {
    return getPostsByUserLike(this.operator, input)
  }

  /**
   * Post 상태를 삭제로 변경 시킨다.
   * @param {RemovePostInput} input
   * @returns {Promise<Post>}
   */
  removePost(input: RemovePostInput) {
    return removePost(this.operator, input)
  }

  /**
   * Post의 views 를 1 증가 시킨다.
   * @param {Yiguana.Document} input
   * @returns {Promise<Post>}
   */
  viewPost(input: Yiguana.Document) {
    return incViews(this.operator, {hk: input.hk, rk: Yiguana.EntityType.Post})
  }

  /**
   * Post의 likes 를 1 증가 시킨다.
   * @param {IncLikesStoreInput} input
   * @returns {Promise<Post>}
   */
  likePost(input: IncLikesStoreInput) {
    return incLikes<Post>(this.operator, input)
  }

  /**
   * Comment 를 추가하고 Post 에 children 을 1 증가 시킨다.
   * @param {T} input
   * @returns {Promise<T>}
   */
  addComment<T extends Comment | Reply>(input: T) {
    return Promise
      .all([
        put(this.operator, input),
        incChildren(this.operator, {
          hk: input.postId,
          rk: Yiguana.EntityType.Post,
        }),
      ])
      .then<T>(R.head)
  }

  /**
   * Comment 목록을 가져온다.
   * @param {CommentsInput} input
   * @returns {Promise<import("./api").PaginationResult<Comment>>}
   */
  getComments(input: CommentsInput) {
    return getComments(this.operator, input)
  }

  /**
   * 유저가 작성한 Comment 목록을 가져온다.
   * @param {CommentsByUserIdInput} input
   * @returns {Promise<import("./api").PaginationResult<Comment>>}
   */
  getCommentsByUserId(input: CommentsByUserIdInput) {
    return getCommentsByUserId(this.operator, input)
  }

  /**
   * 유저가 공감을 표시한 Comment 목록을 가져온다.
   * @param {CommentsByUserLikeInput} input
   * @returns {Promise<{lastEvaluatedKey?: DynamoDB.Key; firstResult?: boolean; items: Comment[]}>}
   */
  getCommentsByUserLike(input: CommentsByUserLikeInput) {
    return getCommentsByUserLike(this.operator, input)
  }

  /**
   * Comment 를 수정한다.
   * 현재 사용되는 시나리오는 없다.
   * @param {UpdateCommentInput} input
   * @returns {Promise<Comment>}
   */
  updateComment(input: UpdateCommentInput) {
    return updateComment(this.operator, input)
  }

  /**
   * Comment 의 상태를 삭제로 변경한다.
   * @param {RemoveCommentInput} input
   * @returns {Promise<Comment>}
   */
  removeComment(input: RemoveCommentInput) {
    return removeComment(this.operator, input)
  }

  /**
   * Like 객체를 추가한다.
   * todo: likePost 와 함쳐지는게 좋아보인다.
   * @param {AddLikeInput} input
   * @returns {Promise<Like>}
   */
  addLike(input: AddLikeInput) {
    return addLike(this.operator, input)
  }

  /**
   * Like 객체를 삭제한다.
   * @param {RemoveLikeInput} input
   * @returns {Promise<import("aws-sdk/lib/request").PromiseResult<DocumentClient.DeleteItemOutput, import("aws-sdk").AWSError>>}
   */
  removeLike(input: RemoveLikeInput) {
    return removeLike(this.operator, input)
  }

  /**
   * likes 를 1 증가 시킨다.
   * todo: raw 레벨로 빼야할지 밖으로 그대로 노출 시킬지 판단이 필요하다.
   * @param {IncLikesStoreInput} input
   * @returns {Promise<Post | Comment | Reply>}
   */
  incLikes(input: IncLikesStoreInput) {
    return incLikes(this.operator, input)
  }

  /**
   * likes 를 1 감소 시킨다.
   * @param {DecLikesStoreInput} input
   * @returns {Promise<Post | Comment | Reply>}
   */
  decLikes(input: DecLikesStoreInput) {
    return decLikes(this.operator, input)
  }

  /**
   * AggReport 목록을 가져온다.
   * @param {AggReportsInput} input
   * @returns {Promise<import("./api").PaginationResult<ReportAgg>>}
   */
  getAggReports(input: AggReportsInput) {
    return getAggReports(this.operator, input)
  }

  /**
   * AggReport 객체에 응답 추가
   * @param {ReplyAggReportInput} input
   * @returns {Promise<void | DocumentClient.UpdateItemOutput>}
   */
  replyAggReport(input: ReplyAggReportInput) {
    return replyAggReport(this.operator, input)
  }

  /**
   * Report 객체에 응답 추가
   * @param {ReplyReportInput} input
   * @returns {Promise<void | DocumentClient.UpdateItemOutput>}
   */
  replyReports(input: ReplyReportInput) {
    return replyReports(this.operator, input)
  }

  /**
   * 모든 Report 목록을 가지고 온다.
   * @param {GetAllReportsInput} input
   * @returns {Promise<Report[]>}
   */
  getReportsAll(input: DynamoDB.Document) {
    return getAllReports(this.operator, input)
  }

  /**
   * Report 목록을 가지고 온다.
   * @param {ReportsInput} input
   * @returns {Promise<import("./api").PaginationResult<Report>>}
   */
  getReports(input: ReportsInput) {
    return getReports(this.operator, input)
  }

  /**
   * 유저에 대한 Report 목록을 가지고 온다.
   * @param {ReportByUserInput} input
   * @returns {Promise<import("./api").PaginationResult<Report>>}
   */
  getReportsByUser(input: ReportByUserInput) {
    return getReportsByUser(this.operator, input)
  }

  /**
   * Report 객체를 생성한다.
   * @param {ReportInput} input
   * @returns {Promise<Report>}
   */
  report(input: ReportInput) {
    return putReport(this.operator, input)
  }

  /**
   * AggReport 누적 객체에 reports 를 1 증가 시킨다.
   * @param {IncReportAggInput} input
   * @returns {Promise<ReportAgg>}
   */
  incReportCount(input: IncReportAggInput) {
    return incReportAgg(this.operator, input)
  }

  /**
   * AggReport 누적 객체에 reports 를 1 감소 시킨다.
   * todo: 현재 사용 케이스가 없다.(신고 취소 케이스)
   * @param {DecReportAggInput} input
   * @returns {Promise<ReportAgg>}
   */
  decReportCount(input: DecReportAggInput) {
    return decReportAgg(this.operator, input)
  }

  // raw 함수들은 래핑을 한번 하는게 좋아보임
  put<T extends Yiguana.Document>(input: PutStoreInput) {
    return put<T>(this.operator, input)
  }

  get<T extends Yiguana.Document>(input: GetStoreInput) {
    return get<T>(this.operator, input)
  }

  update<T extends Yiguana.Document>(input: UpdateStoreInput) {
    return update<T>(this.operator, input)
  }

  del<T extends Yiguana.Document>(input: RemoveStoreInput) {
    return del<T>(this.operator, input)
  }
}

