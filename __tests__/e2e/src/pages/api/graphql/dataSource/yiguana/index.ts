import {DataSource} from 'apollo-datasource'
import {yiguana} from '../../../lib/yiguana'
import {util} from '@deptno/dynamodb'
import {SALT} from '../../../lib/token'

export class Public extends DataSource {
  posts(args: ListArgument<typeof yiguana.post.list>) {
    return yiguana.post
      .list(preListHook(kebabCategory(args)))
      .then(postListHook)
  }

  post(args: ListArgument<typeof yiguana.post.view>) {
    return yiguana.post.view(args)
  }

  comments(args: ListArgument<typeof yiguana.comment.list>) {
    return yiguana.comment
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
}
export class Private extends DataSource {
  posts(args: ListArgument<typeof yiguana.user.post.list>) {
    return yiguana.user.post
      .list(preListHook(kebabCategory(args)))
      .then(postListHook)
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

  deletePost(args: ListArgument<typeof yiguana.post.del>) {
    return yiguana.post.del(args)
  }

  comments(args: ListArgument<typeof yiguana.user.comment.list>) {
    return yiguana.user.comment
      .list(preListHook(args))
      .then(postListHook)
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

  deleteComment(args: ListArgument<typeof yiguana.comment.del>) {
    return yiguana.comment.del(args)
  }
}

const kebabCategory = (arg?) => {
  if (arg.category) {
    return {
      ...arg,
      category: arg.category.replace(/_/g, '-'),
    }
  }
  return arg
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
  const cursor = util.parseToken(lastEvaluatedKey, SALT)

  return {cursor, ...rest}
}

type Argument<F extends Function> = F extends (first: infer A) => any
  ? A
  : never;
type ListArgument<F extends Function> = F extends (first: infer A) => any
  ? Omit<A, 'exclusiveStartKey'> & { cursor?: string }
  : never;

