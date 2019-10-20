import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {Post} from '../../entity/post'
import {EntityFactory} from '../../entity'

export async function del(store: YiguanaStore<Post>, ep: EntityFactory, input: DelInput): Promise<boolean> {
  return store.removePost({hk: input.data.hk})
}

export type DelInput = {
  data: { hk: string }
}
