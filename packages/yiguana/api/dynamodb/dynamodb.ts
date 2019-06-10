import {list, ListInput} from './list'
import {DynamoDbApiInput} from './common'
import {addPost, AddPostInput} from './add-post'
import {removePost, RemovePostInput} from './remove-post'
import {viewPost, ViewPostInput} from './view-post'
import {likePost, LikePostInput} from './like-post'
import {login, LoginInput} from './login'
import {remove, RemoveInput} from './remove'
import {user, UserInput} from './user'
import {addComment, AddCommentInput} from './add-comment'
import {comments, CommentsInput} from './comments'
import {removeComment, RemoveCommentInput} from './remove-comment'

export function createDynamoDbEngine(engineParams: DynamoDbApiInput) {
  return {
    // board
    list(params: ListInput) {
      return list({...engineParams, ...params})
    },
    addPost(params: AddPostInput) {
      return addPost({...engineParams, ...params})
    },
    removePost(params: RemovePostInput) {
      return removePost({...engineParams, ...params})
    },
    // post
    viewPost(params: ViewPostInput) {
      return viewPost({...engineParams, ...params})
    },
    likePost(params: LikePostInput) {
      return likePost({...engineParams, ...params})
    },
    // comment
    comments(params: CommentsInput) {
      return comments({...engineParams, ...params})
    },
    addComment(params: AddCommentInput) {
      return addComment({...engineParams, ...params})
    },
    removeComment(params: RemoveCommentInput) {
      return removeComment({...engineParams, ...params})
    },
    // user
    login(params: LoginInput) {
      return login({...engineParams, ...params})
    },
    user(params: UserInput) {
      return user({...engineParams, ...params})
    },
    // common
    remove(params: RemoveInput) {
      return remove({...engineParams, ...params})
    },
  }
}
