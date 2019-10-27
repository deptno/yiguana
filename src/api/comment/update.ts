import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {CommentUpdateUserInput} from '../../entity/comment'

export async function update(store: MetadataStore, ep: EntityFactory, input: UpdateInput) {
  const {data} = input
  return store.updateComment({
    data
  })
}

export type UpdateInput = {
  data: CommentUpdateUserInput
}
