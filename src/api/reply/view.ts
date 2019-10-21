import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {Post} from '../../entity/post'
import {EntityFactory} from '../../entity'

// @deprecated
export async function view(store: YiguanaStore<Post>, ep: EntityFactory) {
  // comment.view 사용되지 않음
  console.warn('comment.view 사용되지 않음')
}

