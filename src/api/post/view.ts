import {EntityFactory} from '../../entity'
import {ContentStore} from '../../store/s3'
import {MetadataStore} from '../../store/dynamodb'
import * as R from 'ramda'
import {Post} from '../../entity/post'
import {ApiInput, YiguanaDocumentHash} from '../../type'
import {logApiPost as log} from '../../lib/log'

export async function view(ms: MetadataStore, cs: ContentStore, e: EntityFactory, input: ViewApiInput) {
  log('view %j', input)

  return Promise
    .all([
      cs.read(input).then(R.objOf('content')),
      ms.viewPost({
        data: input.data,
      }),
    ])
    .then<Post>(R.apply(Object.assign))
}

export type ViewApiInput = ApiInput<YiguanaDocumentHash>
