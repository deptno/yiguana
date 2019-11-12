import {DataSource} from 'apollo-datasource'
import {yiguana} from '../../../lib/yiguana'
import {util} from '@deptno/dynamodb'
import {SALT} from '../../../lib/token'

export class Yiguana extends DataSource {
  posts(args: ArgumentType<typeof yiguana.post.list>) {
    return yiguana.post
      .list(preHook(args))
      .then(postHook)
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

type ArgumentType<F extends Function> = F extends (first: infer A) => any
  ? Omit<A, 'exclusiveStartKey'> & { nextToken?: string }
  : never;

