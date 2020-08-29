import {inc} from '../raw'
import {logStoreDdb} from '../../../../lib/log'
import {assertPostOrComment} from '../../../../lib/assert'

export async function incView(input: Yiguana.PostDocument) {
  logStoreDdb('incView input %j', input)

  assertPostOrComment(input)

  return inc({
    data: input,
    inc: {
      key: 'views',
      value: 1
    },
  })
}