import {inc} from '../raw/inc'
import {logStoreDdb} from '../../../../lib/log'
import {assertPostOrComment} from '../../../../lib/assert'

export async function incLikes(tableName: string, input: Input) {
  logStoreDdb('incLikes input %j', input)

  assertPostOrComment(input)

  return inc({
    tableName,
    data: input,
    inc: {
      key: 'likes',
      value: 1,
    },
  })
}

type Input = Yiguana.PostDocument | Yiguana.CommentDocument