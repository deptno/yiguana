import {logApiPost as log} from '../../lib/log'
import {removePost} from '../../store/dynamodb/param/delete'
import {EntityType} from '../../enum'

export function del(input: DelApiInput) {
  log('del %j', input)

  return removePost({
    hk: input.data.hk,
    rk: EntityType.Post,
    user: input.user
  })
}

export type DelApiInput = Yiguana.ApiInputWithUser<Yiguana.Document>
