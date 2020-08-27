import {logStoreDdb} from '../../lib/log'
import {assertPostOrComment} from '../../lib/assert'
import {dec} from './raw/dec'

export async function decLikes(operator: {dynamodb, tableName}, input: DecLikesStoreInput) {
  logStoreDdb('decLikes input %j', input)

  assertPostOrComment(input)

  return dec<Post | Comment | Reply>(operator, {
    data: input,
    dec: {
      key: 'likes',
      value: 1,
    },
  })
}

export type DecLikesStoreInput = Post | Comment | Reply

