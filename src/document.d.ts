declare namespace YiguanaDocument {
  /**
   * union
   */
  type RoleType = 'admin' | 'npc' | 'member' | 'nonmember'
  type User = Member | NonMember
  /**
   * enum
   */
  enum EEntityStatus {
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
  /**
   * model
   */
  type Member = {
    id: string
    name: string
    ip: string
    photo?: string
    role?: RoleType
  }
  type NonMember = {
    ip: string
    pw: string
    name: string
  }
  type Document = {
    hk: string
    rk: string
  }
  type Post = {
    rk: 'post'
    views: number
    likes: number
    children: number
    title: string
    contentUrl: string
    cover: string
    user: User
    createdAt,
    posts,
    category,
    byUser,
  } & Document
  type Comment = {
    rk: 'comment'
    content: string
    postId: string
    user: User
    likes: number
    comments: string // gsi.rk
    userId?: string // gsi.user.hk
    byUser?: string //gsi.user.rk
    commentId?: string // reply 에서만 정의된다.
  } & Document
  type Reply = {
    commentId: string
    refUserName?: string
  } & Comment
  type Report = {
    userId: string
    byUser: string
    content: string
    user: User
    data: Post | Comment | Reply
    status: EEntityStatus
  } & Document
  type ReportAgg = {
    hk: string
    rk: string
    agg: string
    reports: string
    reported: number
    status: EEntityStatus
    processed?: number
  } & Document
}
