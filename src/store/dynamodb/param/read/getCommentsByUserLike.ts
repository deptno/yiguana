import {_likesByUser} from '../create/_likesByUser'
import {logStoreDdb} from '../../../../lib/log'

export function getCommentsByUserLike(tableName: string, input: any) {
  logStoreDdb('getCommentsByUserLike input %j', input)

  return _likesByUser(tableName, {
    ...input,
    entity: Yiguana.EntityType.Comment
  })
}
