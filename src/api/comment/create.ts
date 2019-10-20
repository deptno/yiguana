import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {Post, PostNonMemberInput, PostUserInput} from '../../entity/post'
import {EntityFactory} from '../../entity'
import {User} from '../../entity/user'
import {EValidationErrorMessage, ValidationError} from '../../entity/error'
import * as R from 'ramda'

export async function create(store: YiguanaStore<Post>, ep: EntityFactory, input: Input) {
  const {data, user} = input

  if (!user) {
    const {userName, userPw} = data as PostNonMemberInput

    if (!userName) {
      throw new Error(EValidationErrorMessage.InvalidInput)
    }
    if (!userPw) {
      throw new Error(EValidationErrorMessage.InvalidInput)
    }
  }

  // TODO: 로그인 유저인 유저인 경우의 처리
    if (false) {
      try {
        const content = await ep.createPostContent(data)
        const post = ep.createPost({data: content})
        const result = store.addPost({post})

        return result
      } catch (e) {
        console.error(e)
      }
    }

  return ep.createPostContent(data)
    .then(R.objOf('data'))
    .then(ep.createPost)
    .then(R.objOf('post'))
    .then(store.addPost)
    .catch(console.error)
}

export type ApiAddPost = (input: Input) => Promise<unknown>
type Input = {
  data: PostUserInput
  user?: User
}
