import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {EntityFactory} from '../../entity'
import {YiguanaObjectApi} from '../interface'
import {list, ListInput} from './list'
import {create, CreateInput} from './create'
import {read, ReadInput} from './read'
import {update, UpdateInput} from './update'
import {del, DelInput} from './del'
import {view, ViewInput} from './view'
import {like, LikeInput} from './like'
import {unlike, UnlikeInput} from './unlike'
import {Post} from '../../entity/post'

export function createPostApi<P>(store: YiguanaStore<P>, ep: EntityFactory): YiguanaObjectApi<Post, { category }> {
  return {
    list: list.bind(null, store, ep) as (input: ListInput) => ReturnType<typeof list>,
    create: create.bind(null, store, ep) as (input: CreateInput) => ReturnType<typeof create>,
    read: read.bind(null, store, ep) as (input: ReadInput) => ReturnType<typeof read>,
    update: update.bind(null, store, ep) as (input: UpdateInput) => ReturnType<typeof update>,
    del: del.bind(null, store, ep) as (input: DelInput) => ReturnType<typeof del>,
    like: like.bind(null, store, ep) as (input: LikeInput) => ReturnType<typeof like>,
    unlike: unlike.bind(null, store, ep) as (input: UnlikeInput) => ReturnType<typeof unlike>,
    view: view.bind(null, store, ep) as (input: ViewInput) => ReturnType<typeof view>,
  }
}

