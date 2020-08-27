import {inc} from './raw/inc'
import {logStoreDdb} from '../../lib/log'
import {assertPostOrComment} from '../../lib/assert'

export async function incLikes<T extends Yiguana.PostDocument|Yiguana.CommentDocument>(operator: {dynamodb, tableName}, input: IncLikesStoreInput) {
  logStoreDdb('incLikes input %j', input)

  assertPostOrComment(input)

  return inc<T>(operator, {
    data: input,
    inc: {
      key: 'likes',
      value: 1
    },
  })
}

export type IncLikesStoreInput = Yiguana.Document

