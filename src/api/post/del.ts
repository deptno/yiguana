import {logApiPost as log} from '../../lib/log'
import {assertsMemberOrNot} from '../../lib/assert'
import {removePost} from '../../store/dynamodb/param/delete'
import {EntityType} from '../../enum'

export async function del(input: DelApiInput) {
  log('del %j', input)

  assertsMemberOrNot(input.user)

  return removePost({
    hk: input.data.hk,
    rk: EntityType.Post,
    user: input.user
  })
}

export type DelApiInput = Yiguana.ApiInputWithUser<Yiguana.Document>
