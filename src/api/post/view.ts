import {EntityFactory} from '../../entity'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'
import {ContentStore} from '../../store/s3'
import {MetadataStore} from '../../store/dynamodb'
import * as R from 'ramda'

export async function view(ms: MetadataStore, cs: ContentStore, e: EntityFactory, input: ViewInput) {
  return Promise
    .all([
      cs.read(input).then(R.objOf('content')),
      ms.viewPost({
        data: input.data,
      }),
    ])
    .then(Object.assign)
}

export type ViewInput = {
  data: YiguanaDocumentHash
}
