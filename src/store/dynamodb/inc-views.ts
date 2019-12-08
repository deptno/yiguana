import {DynamoDBInput} from '../../entity/input/dynamodb'
import {inc} from './raw/inc'
import {logStoreDdb} from '../../lib/log'
import {assertPostOrComment} from '../../lib/assert'
import {Post} from '../../entity'

export async function incViews(operator: DynamoDBInput, input: IncViewsStoreInput) {
  logStoreDdb('incViews input %j', input)

  assertPostOrComment(input)

  return inc<Post>(operator, {
    data: input,
    inc: {
      key: 'views',
      value: 1
    },
  })
}

export type IncViewsStoreInput = Post

