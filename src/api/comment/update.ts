import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {CommentUpdateUserInput} from '../../entity/comment'

export async function update(store: MetadataStore, ep: EntityFactory, input: UpdateInput) {
  return store.updateComment(input)
}

export type UpdateInput = {
  data: CommentUpdateUserInput
}
