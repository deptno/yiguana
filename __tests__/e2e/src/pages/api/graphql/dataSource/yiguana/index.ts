import {DataSource} from 'apollo-datasource'
import {yiguana} from '../../../lib/yiguana'
import {util} from '@deptno/dynamodb'
import {SALT} from '../../../lib/token'

export class Public extends DataSource {
  posts(args: ListArgument<typeof yiguana.post.list>) {
    return yiguana.post
      .list(preHook(kebabCategory(args)))
      .then(postHook)
  }
  post(args: ListArgument<typeof yiguana.post.view>) {
    return yiguana.post.view(args)
  }
  comments(args: ListArgument<typeof yiguana.comment.list>) {
    return yiguana.comment
      .list(preHook(args))
      .then(postHook)
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
      .list(preHook(kebabCategory(args)))
      .then(postHook)
  }

  comments(args: ListArgument<typeof yiguana.user.comment.list>) {
    return yiguana.user.comment
      .list(preHook(args))
      .then(postHook)
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
const preHook = (arg?) => {
  console.log('arg', arg)
  const {cursor, ...rest} = arg
  const exclusiveStartKey = util.parseToken(cursor, SALT)

  return {
    exclusiveStartKey,
    ...rest,
  }
}
const postHook = (params?) => {
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

