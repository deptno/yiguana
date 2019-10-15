import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {EntityFactory} from '../../entity'
import {YiguanaObjectApi} from '../interface'
import {like} from './like'
import {list} from './list'
import {create} from './create'
import {read} from './read'
import {update} from './update'
import {del} from './del'
import {view} from './view'
import {Reply} from '../../entity/reply/reply'

export function createReplyApi<P>(store: YiguanaStore<P>, ep: EntityFactory)
  : YiguanaObjectApi<Reply, {commentId}> {
  return {
    list,
    create,
    read,
    update,
    del,
    like,
    view,
  } as any
}
