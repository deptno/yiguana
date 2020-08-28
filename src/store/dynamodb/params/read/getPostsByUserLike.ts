import {logStoreDdb} from '../../../../lib/log'
import {_likesByUser} from '../create/_likesByUser'

export function getPostsByUserLike(tableName: string, input: any) {
  logStoreDdb('getPostsByUserLike input %j', input)

  return _likesByUser(tableName, {
    ...input,
    entity: Yiguana.EntityType.Post
  })
}
