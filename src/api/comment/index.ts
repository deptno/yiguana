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

export function createCommentApi<P>(store: YiguanaStore<P>, ep: EntityFactory): YiguanaObjectApi {
  return {
    list,
    create,
    read,
    update,
    del,
    like,
    view,
  }
}
