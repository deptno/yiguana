import {ContentStore} from '../../store/s3'
import {MetadataStore} from '../../store/dynamodb'
import * as R from 'ramda'
import {logApiPost as log} from '../../lib/log'
import {Post} from '../../model'

export async function view(ms: MetadataStore, cs: ContentStore, input: ViewApiInput) {
  log('view input %j', input)

  return Promise
    .all([
      cs.read(input).then(R.objOf('content')),
      ms.viewPost(input.data)
    ])
    .then<Post>(R.apply(Object.assign))
}

export type ViewApiInput = Yiguana.ApiInput<Yiguana.Document>
