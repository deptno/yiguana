import {Comment, Member, Post, User} from './entity'

export type ApiInput<T> = {
  data: T
}
export type UserApiInput<T> = {
  data: T
  user: User
}
export type MemberApiInput<T> = {
  data: T
  user: Member
}

export type LikeCommentApiInput = UserApiInput<{
  data: Comment
  createdAt: string
}>
export type LikePostApiInput = UserApiInput<{
  data: Post
  createdAt: string
}>
export type ReportApiInput = UserApiInput<{
  data: Comment|Post
  content: string
  createdAt: string
}>
export enum EEntityStatus {
  // 유저가 신고했을 때 유저 입장에서의 최초 상태
  requestedBlock = 'requestedBlock',
  // 현재는 쓰이지 않으나 자동으로 충족된 조건에 의해서 블락되는 경우
  blockedBySystem = 'blockedBySystem',
  // 유저가 삭제한 경우
  deletedByUser = 'deletedByUser',
  // 관리자에 의해 삭제된 경우
  deletedByAdmin = 'deletedByAdmin',
  // 현재는 쓰이지 않으나 자동으로 충족된 조건에 의해서 삭제되는 경우
  deletedBySystem = 'deletedBySystem',
  // 관리자가 판단하기에 이상없음
  innocent = 'innocent',
  // 일정 수 이상 데이터가 쌓이면 AggReport 객체는 이상태가 된다. 현재는 1부터 시작이라 여기서 부터 바로 시작
  inAudit = 'inAudit',
}
export enum EEntity {
  Post = 'post',
  Comment = 'comment',
  Like = 'like',
  Report = 'report',
  Agg = 'agg',
}
export type YiguanaDocumentHash = { hk: string }
export type YiguanaDocumentHashRange = YiguanaDocumentHash & { rk: EEntity | string }
export interface YiguanaDocument extends YiguanaDocumentHashRange {
  createdAt: string
  updatedAt?: string
  status?: EEntityStatus
}
export enum EIndexName {
  posts = 'posts',
  postsByCategory = 'postsByCategory',
  comments = 'comments',
  byUser = 'byUser',
  reports = 'reports',
  reportsEnd = 'reportsEnd',
}
