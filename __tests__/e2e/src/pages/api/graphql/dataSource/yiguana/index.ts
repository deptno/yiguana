import {DataSource} from 'apollo-datasource'
import {yiguana} from '../../../lib/yiguana'
import {util} from '@deptno/dynamodb'
import {SALT} from '../../../lib/token'

export class Yiguana extends DataSource {
  posts(args: ListArgument<typeof yiguana.post.list>) {
    return yiguana.post
      .list(preHook(args))
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

const preHook = (arg?) => {
  console.log('arg', arg)
  const {nextToken, ...rest} = arg
  const exclusiveStartKey = util.parseToken(nextToken, SALT)

  return {
    exclusiveStartKey,
    ...rest,
  }
}
const postHook = (params?) => {
  const {lastEvaluatedKey, ...rest} = params
  const nextToken = util.parseToken(lastEvaluatedKey, SALT)

  return {nextToken, ...rest}
}

type Argument<F extends Function> = F extends (first: infer A) => any
  ? A
  : never;
type ListArgument<F extends Function> = F extends (first: infer A) => any
  ? Omit<A, 'exclusiveStartKey'> & { nextToken?: string }
  : never;

