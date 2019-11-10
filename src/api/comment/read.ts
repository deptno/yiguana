import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {CommentUpdateUserInput} from '../../entity/comment'

export async function read(store: MetadataStore, ep: EntityFactory, input: ReadInput) {
  return store.comment(input.data)
}

export type ReadInput  = {
  data: CommentUpdateUserInput
}
