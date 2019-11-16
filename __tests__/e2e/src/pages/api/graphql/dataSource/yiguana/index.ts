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
}
export class Private extends DataSource {
  posts(args: ListArgument<typeof yiguana.user.post.list>) {
    return yiguana.user.post
      .list(preListHook(kebabCategory(args)))
      .then(postListHook)
  }

  likePost(args: ListArgument<typeof yiguana.user.post.like>) {
    return yiguana.user.post.like(args)
  }

  deletePost(args: ListArgument<typeof yiguana.post.del>) {
    return yiguana.post.del(args)
  }

  comments(args: ListArgument<typeof yiguana.user.comment.list>) {
    return yiguana.user.comment
      .list(preListHook(args))
      .then(postListHook)
  }

  likeComment(args: ListArgument<typeof yiguana.user.comment.like>) {
    return yiguana.user.comment.like(args)
  }

  deleteComment(args: ListArgument<typeof yiguana.comment.del>) {
    return yiguana.comment.del(args)
  }
}

const kebabCategory = (arg?) => {
  if (arg.category) {
    return {
      ...arg,
      category: arg.category.replace(/_/g, '-')
    }
  }
  return arg
}
const preListHook = (arg?) => {
  console.log('arg', arg)
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

