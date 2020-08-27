import {{dynamodb, tableName}} from '..//input/dynamodb'
import {inc} from './raw/inc'
import {logStoreDdb} from '../../lib/log'
import {assertPostOrComment} from '../../lib/assert'
import {Post, Comment} from '../'

export async function incChildren<T extends Post>(operator: {dynamodb, tableName}, input: IncChildrenStoreInput) {
  logStoreDdb('incChildren input %j', input)

  assertPostOrComment(input)

  return inc<T>(operator, {
    data: input,
    inc: {
      key: 'children',
      value: 1
    },
  })
}

export type IncChildrenStoreInput = Yiguana.Document

