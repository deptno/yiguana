import {DataSource} from 'apollo-datasource'
import {yiguana} from '../../../lib/yiguana'
import {util} from '@deptno/dynamodb'
import {SALT} from '../../../lib/token'
import {overrideResponseByStatus} from '../../../lib/display'
import {User} from '../../../../../../../../../lib/entity/user'
import {YiguanaDocument} from '../../../../../../../../../src/type'

export class Public extends DataSource {
  posts(args: ListArgument<typeof yiguana.post.list>) {
    return yiguana.post
      .list(preListHook(args))
      .then(postListHook)
      .then(overrideResponseByStatus)
  }

  post(args: Argument<typeof yiguana.post.view>) {
    return yiguana.post.view(args)
  }

  comments(args: ListArgument<typeof yiguana.comment.list>) {
    return yiguana.comment
      .list(preListHook(args))
      .then(postListHook)
      .then(overrideResponseByStatus)
  }

  comment(args: Argument<typeof yiguana.comment.read>) {
    return yiguana.comment.read(args)
  }

  aggReports(args: ListArgumentWithAuth<typeof yiguana.administrator.aggReport.list>) {
    return yiguana.administrator.aggReport
      .list(preListHook(args))
      .then(postListHook)
  }

  reports(args: ListArgumentWithAuth<typeof yiguana.administrator.report.list>) {
    return yiguana.administrator.report
      .list(preListHook(args))
      .then(postListHook)
  }

  writePost(args: Argument<typeof yiguana.post.create>) {
    return yiguana.post.create(args)
  }

  writeComment(args: Argument<typeof yiguana.comment.create>) {
    return yiguana.comment.create(args)
  }

  writeReply(args: Argument<typeof yiguana.reply.create>) {
    return yiguana.reply.create(args)
  }

  getUploadUrl(args: Argument<typeof yiguana.common.createUploadUrl>) {
    return yiguana.common.createUploadUrl(args)
  }

  async replyReport(args: Argument<typeof yiguana.administrator.replyReport>) {
    return yiguana.administrator.replyReport(args)
  }
}
export class Private extends DataSource {
  get<T extends YiguanaDocument>(args: Argument<typeof yiguana.user.get>) {
    return yiguana.user.get<T>(args)
  }

  posts(args: ListArgumentWithAuth<typeof yiguana.user.post.list>) {
    return yiguana.user.post
      .list(preListHook(args))
      .then(postListHook)
      .then(overrideResponseByStatus)
  }

  likePost({data: {hk}, user}) {
    const createdAt = new Date().toISOString()

    return yiguana.post.read({data: {hk}})
      .then(data => {
        if (!data) {
          throw new Error('unknown comment')
        }
        return yiguana.user.post.like({
          data: {
            data,
            createdAt,
          },
          user,
        })
      })
  }

  deletePost(args: Argument<typeof yiguana.post.del>) {
    return yiguana.post.del(args)
  }

  comments(args: ListArgumentWithAuth<typeof yiguana.user.comment.list>) {
    return yiguana.user.comment
      .list(preListHook(args))
      .then(postListHook)
      .then(overrideResponseByStatus)
  }

  likeComment({data: {hk}, user}) {
    const createdAt = new Date().toISOString()

    return yiguana.comment.read({data: {hk}})
      .then(data => {
        if (!data) {
          throw new Error('unknown comment')
        }
        return yiguana.user.comment.like({
          data: {
            data,
            createdAt,
          },
          user,
        })
      })
  }

  deleteComment(args: Argument<typeof yiguana.comment.del>) {
    return yiguana.comment.del(args)
  }

  reports(args: ListArgumentWithAuth<typeof yiguana.user.report.list>) {
    return yiguana.user.report.list(args)
  }

  report(args: Argument<typeof yiguana.user.report.create>) {
    return yiguana.user.report.create(args)
  }
}

const preListHook = (arg?) => {
  const {cursor, ...rest} = arg
  const exclusiveStartKey = util.parseToken(cursor, SALT)

  return {
    exclusiveStartKey,
    ...rest,
  }
}
const postListHook = (params?) => {
  const {lastEvaluatedKey, ...rest} = params
  const cursor = util.createToken(lastEvaluatedKey, SALT)

  return {cursor, ...rest}
}

type Argument<F extends Function> = F extends (first: infer A) => any
  ? A
  : never
type ListArgument<F extends Function> = F extends <T extends { user: infer B, data: infer A }>(first: T) => any
  ? {data: Omit<A, 'exclusiveStartKey'> & { cursor?: string } }
  : never
type ListArgumentWithAuth<F extends Function> = F extends <T extends { user: infer B, data: infer A }>(first: T) => any
  ? {user: User, data: Omit<A, 'exclusiveStartKey'> & { cursor?: string } }
  : never

