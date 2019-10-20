import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {Post} from '../../entity/post'
import {EntityFactory} from '../../entity'

export async function read(store: YiguanaStore<Post>, ep: EntityFactory, input: ReadInput) {
  return store.post({
    hk: input.data.hk
  })
}

export type ReadInput = {
  data: Post
}
