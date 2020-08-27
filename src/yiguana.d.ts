declare namespace Yiguana {
  /**
   * union
   */
  type RoleType = 'admin' | 'npc' | 'member' | 'nonmember'
  type User = Member | NonMember
  /**
   * enum
   */
  enum EntityStatusType {
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
  enum EntityType {
    Post = 'post',
    Comment = 'comment',
    Like = 'like',
    Report = 'report',
    Agg = 'agg',
  }
  enum IndexType {
    posts = 'posts',
    postsByCategory = 'postsByCategory',
    comments = 'comments',
    byUser = 'byUser',
    reports = 'reports',
    reportsEnd = 'reportsEnd',
  }
  type ContentStoreOption = {
    contentLengthRange: {
      min: number
      max: number
    }
  }
  /**
   * api interface
   */
  type ApiInput<T> = {
    data: T
  }
  type ApiInputWithUser<T> = {
    data: T
    user: User
  }

  /**
   * model
   */
  type Document = {
    createdAt: string
    updatedAt?: string
    status?: EntityStatusType
  } & DynamoDB.Document
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
  type PostDocument = {
    rk: 'post'
    views: number
    likes: number
    children: number
    title: string
    contentUrl: string
    cover: string
    user: User
    createdAt: string
    posts: PostDocument[]
    category: string
    byUser: string
  } & Document
  type CommentDocument = {
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
  type ReplyDocument = {
    commentId: string
    refUserName?: string
  } & CommentDocument
  type ReportDocument = {
    userId: string
    byUser: string
    content: string
    user: User
    input: PostDocument | CommentDocument | ReplyDocument
    status: EntityStatusType
  } & Document
  type ReportAggDocument = {
    hk: string
    rk: string
    agg: string
    reports: string
    reported: number
    status: EntityStatusType
    processed?: number
  } & Document
  type LikeDocument = {
    userId: string
    byUser: string
    user: User
    data: PostDocument | CommentDocument | ReplyDocument
  } & Document
}
