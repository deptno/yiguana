import {DynamoDBInput} from '../../entity/input/dynamodb'
import {YiguanaDocumentHashRange} from '../../type'
import {inc} from './raw/inc'
import {logStoreDdb} from '../../lib/log'
import {assertPostOrComment} from '../../lib/assert'
import {Post, Comment} from '../../entity'

export async function incLikes<T extends Post|Comment>(operator: DynamoDBInput, input: IncLikesStoreInput) {
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

export type IncLikesStoreInput = YiguanaDocumentHashRange

