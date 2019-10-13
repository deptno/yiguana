import {YiguanaApi} from './store/dynamodb/dynamodb'
import * as R from 'ramda'

export {createStore} from './store/dynamodb/dynamodb'
export class Yiguana<T> {
  public constructor(private api: YiguanaApi<T>) {}

  public board = R.pick(['post', 'posts', 'addPost', 'removePost'], this.api)
  public post = R.pick(['post', 'posts', 'addPost', 'removePost'], this.api)
  public comment = R.pick(['post', 'posts', 'addPost', 'removePost'], this.api)
  public commentReply = R.pick(['post', 'posts', 'addPost', 'removePost'], this.api)
}
