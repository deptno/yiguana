import {EntityFactory} from '../../entity'
import {ContentStore} from '../../store/s3'
import {MetadataStore} from '../../store/dynamodb'
import * as R from 'ramda'
import {Post} from '../../entity/post'
import {ApiInput} from '../../type'
import {logApiPost} from '../../lib/log'
import {YiguanaDocumentHash} from '../../dynamodb'

export async function view(ms: MetadataStore, cs: ContentStore, e: EntityFactory, input: ViewInput) {
  log('view %j', input)
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

export type ViewInput = ApiInput<YiguanaDocumentHash>

const log = logApiPost.extend('view')
