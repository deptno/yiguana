import {MetadataStore} from '../../store/dynamodb'
import {Post} from '../../entity/post'
import {EntityFactory} from '../../entity'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'

export async function like(store: MetadataStore, ep: EntityFactory, input: LikeInput): Promise<Post|undefined> {
  return store.likePost({
    data: input.data,
  })
}

export type LikeInput = {
  data: YiguanaDocumentHash
}

