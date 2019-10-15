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
import {Post} from '../../entity/post'
import {unlike} from './unlike'

export function createPostApi<P>(store: YiguanaStore<P>, ep: EntityFactory): YiguanaObjectApi<Post, {category}> {
  return {
    list: list.bind(null, store, ep),
    create: create.bind(null, store, ep),
    read: read.bind(null, store, ep),
    update: update.bind(null, store, ep),
    del: del.bind(null, store, ep),
    like: like.bind(null, store, ep),
    unlike: unlike.bind(null, store, ep),
    view: view.bind(null, store, ep),
  }
}

