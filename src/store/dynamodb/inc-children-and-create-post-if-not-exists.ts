import {DynamoDBInput} from '../../entity/input/dynamodb'
import {YiguanaDocumentHashRange} from '../../type'
import {logStoreDdb} from '../../lib/log'
import {assertPostOrComment} from '../../lib/assert'
import {Post} from '../../entity'
import {incAndCreateIfNotExists} from './raw/incAndCreateIfNotExists'

export async function incChildrenAndCreatePostIfNotExists<T extends Post, U extends YiguanaDocumentHashRange>(
  operator: DynamoDBInput,
  input: U
) {
  logStoreDdb('incChildren input %j', input)

  assertPostOrComment(input)

  return incAndCreateIfNotExists<T>(operator, {
    data: input,
    inc: {
      key: 'children',
      value: 1
    },
  })
}