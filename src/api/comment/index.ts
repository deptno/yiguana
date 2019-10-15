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
import {Comment} from '../../entity/comment'

export function createCommentApi<P>(store: YiguanaStore<P>, ep: EntityFactory)
  : YiguanaObjectApi<Comment, {postId}> {
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
