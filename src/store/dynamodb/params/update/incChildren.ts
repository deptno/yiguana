import {inc} from '../raw/inc'
import {logStoreDdb} from '../../../../lib/log'
import {assertPostOrComment} from '../../../../lib/assert'

export async function incChildren(tableName: string, input: Yiguana.PostDocument) {
  logStoreDdb('incChildren input %j', input)

  assertPostOrComment(input)

  return inc({
    tableName,
    data: input,
    inc: {
      key: 'children',
      value: 1
    },
  })
}
