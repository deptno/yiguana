# @deptno/yiguana

![](https://github.com/deptno/yiguana/workflows/pr/badge.svg)
![](https://github.com/deptno/yiguana/workflows/master/badge.svg)

yiguana-sdk,

## uml

![](doc/class-diagram.svg)
<!--
@startuml class-diagram

title 클래스 다이어그램

abstract class Document {
    +hk: string
    -rk: string
}
class YiguanaDocument extends Document {
    +hk: string
    -rk: string
    -- attributes --
    postId?: string
    userId: string
    category: string
    byUser: string
    comments: string
    posts: string
    agg: string
    reports: string
    reportsEnd: string
    -- common --
    createdAt: string
    updatedAt?: string
    status?: EEntityStatus
}
class Comment extends YiguanaDocument {
    content: string
    postId: string
    user: User
    likes: number
    === gsi ==
    comments: string // gsi.rk
    userId?: string // gsi.user.hk
    byUser?: string //gsi.user.rk
    commentId?: string // reply 에서만 정의된다.
}
class Reply extends Comment {
    ~commentId: string
    refUserName?: string
}
class Like extends YiguanaDocument {
    userId: string
    byUser: string
    user: User
    ~data: Post | Comment | Reply
}
class Post extends YiguanaDocument {
    rk: EEntity.Post
    --
    views: number
    likes: number
    children: number
    title: string
    contentUrl: string
    ~user: User
    cover?: string
    updatedAt?: string
    content?: string
    userId?: string // gsi.hk
    byUser?: string // gsi.rk
    category: string // gsi.rk
    posts: string // gsi.rk
}
class Report extends YiguanaDocument {
    userId: string
    byUser: string
    content: string
    user: User
    data: Post | Comment | Reply
    status: EEntityStatus
}
class ReportAgg extends YiguanaDocument {
    agg: string
    reports: string
    reported: number
    status: EEntityStatus
    processed?: number
}
class Member extends YiguanaDocument {
    ip: string
    id: string
    name: string
    photo?: string
    role?: ERole
}
class NonMember extends YiguanaDocument {
    ip: string
    pw: string
    name: string
}


Post "userId" *... Member : < id
Post "byUser" *... Member : < rk

Comment "user" *--- Member
Comment "byUser" *--- Member
Comment "hk" *... Reply : < commentId

Report "user" *-- User : < commentId
Report "data" *.. Post
Report "data" *.. Comment
Report "data" *.. Reply

enum EEntityStatus {
    requestedBlock **유저가 신고했을 때 유저 입장에서의 최초 상태**
    blockedBySystem **현재는 쓰이지 않으나 자동으로 충족된 조건에 의해서 블락되는 경우**
    deletedByUser **유저가 삭제한 경우**
    deletedByAdmin **관리자에 의해 삭제된 경우**
    deletedBySystem **현재는 쓰이지 않으나 자동으로 충족된 조건에 의해서 삭제되는 경우**
    innocent **관리자가 판단하기에 이상없음**
    inAudit **일정 수 이상 데이터가 쌓이면 AggReport 객체는 이상태가 된다. 현재는 1부터 시작이라 여기서 부터 바로 시작**
}
enum EIndexName {
  posts
  postsByCategory
  comments
  byUser
  reports
  reportsEnd
}
enum ERole {
  admin
  npc
  member
  nonmember
}
enum EYiguanaError {
  assert_max_length
  login_is_required
  not_member_must_have_pw
  pw_must_not_empty
  user_must_have_ip
  user_must_have_name
  empty_string
  not_string
  admin_access_only
  post_comment_reply_are_supported
}
@enduml
-->

## log
```shell script
DEBUG=yiguana
DEBUG=yiguana:assert
DEBUG=yiguana:api:common
DEBUG=yiguana:api:post
DEBUG=yiguana:api:comment
DEBUG=yiguana:api:reply
DEBUG=yiguana:api:administrator:report
DEBUG=yiguana:api:administrator:aggReport
DEBUG=yiguana:api:user
DEBUG=yiguana:api:user:post
DEBUG=yiguana:api:user:comment
DEBUG=yiguana:api:user:reply
DEBUG=yiguana:api:user:report
DEBUG=yiguana:store:s3
DEBUG=yiguana:store:ddb
```
