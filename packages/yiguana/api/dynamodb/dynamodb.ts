import {list, ListInput} from './list'
import {DynamoDbApiInput} from './common'
import {addPost, AddPostInput} from './add-post'
import {removePost, RemovePostInput} from './remove-post'
import {viewPost, ViewPostInput} from './view-post'
import {likePost, LikePostInput} from './like-post'
import {login, LoginInput} from './login'

export function createDynamoDbEngine(engineParams: DynamoDbApiInput) {
  return {
    list(params: ListInput) {
      return list({...engineParams, ...params})
    },
    addPost(params: AddPostInput) {
      return addPost({...engineParams, ...params})
    },
    removePost(params: RemovePostInput) {
      return removePost({...engineParams, ...params})
    },
    viewPost(params: ViewPostInput) {
      return viewPost({...engineParams, ...params})
    },
    likePost(params: LikePostInput) {
      return likePost({...engineParams, ...params})
    },
    login(params: LoginInput) {
      return login({...engineParams, ...params})
    },
  }
}
