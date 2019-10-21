import {YiguanaStore} from './store/dynamodb/dynamodb'
import * as R from 'ramda'
import {createApi} from './api'

export {createApi} from './api'

export class Yiguana<T> {
  public constructor(private api: YiguanaStore<T>) {}

  public board = R.pick(['post', 'posts', 'addPost', 'removePost'], this.api)
  public post = R.pick(['post', 'posts', 'addPost', 'removePost'], this.api)
  public comment = R.pick(['post', 'posts', 'addPost', 'removePost'], this.api)
  public commentReply = R.pick(['post', 'posts', 'addPost', 'removePost'], this.api)
}

export function createYiguana() {
  return createApi
}
