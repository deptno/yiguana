import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'

// @deprecated
export async function view(store: MetadataStore, ep: EntityFactory, input: ViewInput) {
  // comment.view 사용되지 않음
  console.warn('comment.view 사용되지 않음')
}

export type ViewInput = {
  data: YiguanaDocumentHash
}
