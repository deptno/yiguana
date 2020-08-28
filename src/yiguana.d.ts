declare namespace Yiguana {
  /**
   * union
   */
  type User = Member | NonMember
  /**
   * enum
   */
  enum RoleType {
    admin = 'admin',
    npc = 'npc',
    member = 'member',
    nonmember = 'nonmember'
  }
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
  type AdminMember = Member & {
    role: RoleType.admin
  }
  type NonMember = {
    ip: string
    pw: string
    name: string
  }
  type PostDocument = {
    rk: EntityType.Post
    views: number
    likes: number
    children: number
    title: string
    contentUrl: string
    user: User
    createdAt: string
    posts: string // IndexType.posts
    category: string
    byUser: string
    cover?: string
    userId?: string // IndexType.byUser
  } & Document
  type CommentDocument = {
    rk: EntityType.Comment
    content: string
    postId: string
    user: User
    likes: number
    comments: string // IndexType.comments
    userId?: string // IndexType.byUser
    byUser?: string // IndexType.byUser
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
    data:
      | PostDocument
      | CommentDocument
      | ReplyDocument
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
    data:
      | PostDocument
      | CommentDocument
      | ReplyDocument
  } & Document

  /**
   * misc
   */
  type LikeableEntity =
    | PostDocument
    | CommentDocument
    | ReplyDocument
  type ReportableEntity =
    | PostDocument
    | CommentDocument
    | ReplyDocument
  type LikeInput = {
    entity: EntityType.Post | EntityType.Comment
    targetId: string
    createdAt: string
  }

  type PostContent = {
    id: string
    title: string
    category: string
    contentUrl: string
    cover?: string
  }

  export type CommentUserInput = {
    postId: string
    content: string
    createdAt: string
  }

  export type ReplyUserInput = {
    comment: CommentDocument | ReplyDocument
    content: string
    createdAt: string
    refUserName?: string
  }
}