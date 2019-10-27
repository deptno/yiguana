import {EntityFactory} from '../../entity'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'
import {ContentStore} from '../../store/s3'
import {MetadataStore} from '../../store/dynamodb'
import * as R from 'ramda'
import {Post} from '../../entity/post'

export async function view(ms: MetadataStore, cs: ContentStore, e: EntityFactory, input: ViewInput) {
  // cs.read 를 해서 내보내고 있지만 사실상 클라이언트에서 처리해도 무관함
  return Promise
    .all([
      cs.read(input).then(R.objOf('content')),
      ms.viewPost({
        data: input.data,
      }),
    ])
    .then<Post>(R.apply(Object.assign))
}

export type ViewInput = {
  data: YiguanaDocumentHash
}
