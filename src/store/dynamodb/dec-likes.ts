import {DynamoDBInput} from '../../entity/input/dynamodb'
import {logStoreDdb} from '../../lib/log'
import {assertPostOrComment} from '../../lib/assert'
import {dec} from './raw/dec'
import {Comment, Post} from '../../entity'

export async function decLikes(operator: DynamoDBInput, input: DecLikesStoreInput) {
  logStoreDdb('decLikes input %j', input)

  assertPostOrComment(input)

  return dec<Post|Comment>(operator, {
    data: input,
    dec: {
      key: 'likes',
      value: 1
    },
  })
}

export type DecLikesStoreInput = Post|Comment

