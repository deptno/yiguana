import {TestGlobal} from '../scenario'
import * as Post from '../../packages/yiguana/entity/post'
import {post} from '../data/post'

export function createPost<T extends TestGlobal>(shared: T) {
  return () => {
    shared.post = Post.create(post)
  }
}
