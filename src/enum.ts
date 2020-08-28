export enum RoleType {
  admin = 'admin',
  npc = 'npc',
  member = 'member',
  nonmember = 'nonmember'
}
export enum EntityStatusType {
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
export enum EntityType {
  Post = 'post',
  Comment = 'comment',
  Like = 'like',
  Report = 'report',
  Agg = 'agg',
}
export enum IndexType {
  posts = 'posts',
  postsByCategory = 'postsByCategory',
  comments = 'comments',
  byUser = 'byUser',
  reports = 'reports',
  reportsEnd = 'reportsEnd',
}