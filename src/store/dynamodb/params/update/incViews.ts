import {inc} from '../raw/inc'
import {logStoreDdb} from '../../../../lib/log'
import {assertPostOrComment} from '../../../../lib/assert'

export async function incViews(tableName: string, input: Yiguana.PostDocument) {
  logStoreDdb('incViews input %j', input)

  assertPostOrComment(input)

  return inc({
    tableName,
    data: input,
    inc: {
      key: 'views',
      value: 1
    },
  })
}