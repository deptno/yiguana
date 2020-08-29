import * as R from 'ramda'
import {logApiPost as log} from '../../lib/log'
import {Post} from '../../model'
import {incView} from '../../store/dynamodb/param/update'
import {getPostContentUnSafe} from '../../store/s3/getPostContent'

export async function view(input: ViewApiInput) {
  log('view input %j', input)

  return Promise
    .all([
      getPostContentUnSafe(input).then(R.objOf('content')),
      incView(input.data)
    ])
    .then<Post>(R.apply(Object.assign))
}

export type ViewApiInput = Yiguana.ApiInput<Yiguana.PostDocument>
