import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {EntityFactory} from '../../entity'
import {YiguanaObjectApi} from '../interface'
import {Comment} from '../../entity/comment'
import {like} from './like'
import {unlike} from './unlike'
import {list, ListInput} from './list'
import {create, CreateInput} from './create'
import {update, UpdateInput} from './update'
import {del} from './del'
import {view} from './view'

//export function createCommentApi<P>(store: YiguanaStore<P>, ep: EntityFactory): YiguanaObjectApi<Comment, { postId }> {
export function createCommentApi<P>(store: YiguanaStore<P>, ep: EntityFactory) {
  return {
    list: list.bind(null, store, ep) as (input: ListInput) => ReturnType<typeof list>,
    create: create.bind(null, store, ep) as (input: CreateInput) => ReturnType<typeof create>,
    update: update.bind(null, store, ep) as (input: UpdateInput) => ReturnType<typeof update>,
    del: del.bind(null, store, ep),
    like: like.bind(null, store, ep),
    unlike: unlike.bind(null, store, ep),
    view: view.bind(null, store, ep),
  } as any
}
