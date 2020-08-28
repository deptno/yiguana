import {logStoreDdb} from '../../../../lib/log'
import {assertPostOrComment} from '../../../../lib/assert'
import {dec} from '../raw/dec'

export async function decLikes(tableName: string, input: Input) {
  logStoreDdb('decLikes input %j', input)

  assertPostOrComment(input)

  return dec<Input>(tableName, {
    data: input,
    dec: {
      key: 'likes',
      value: 1,
    },
  })
}

type Input = Yiguana.PostDocument | Yiguana.CommentDocument | Yiguana.ReplyDocument

