import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {PostUserInput} from '../../entity/post'
import {EntityFactory} from '../../entity'
import {User} from '../../entity/user'
import {EValidationErrorMessage, ValidationError} from '../../entity/error'
import {postLogger as log} from '../../lib/log'

export async function create(store: YiguanaStore, ep: EntityFactory, input: CreateInput) {
  log('create %j', input)
  validateUser(input.user)

  const user = input.user
  // createPostContent 는 throw 가능성(unsafe)이 있다.
  const content = await ep.createPostContent(input.data)
  const post = ep.createPost({
    user,
    data: content,
  })

  return store.addPost({data: post})
}

const validateUser = (user: User) => {
  if ('userId' in user) {
    // 회원
    log('member', user.userId)
  } else {
    // TODO: 비회원, 비회원이 우선순위
    const {name, pw} = user

    if (!name) {
      throw new ValidationError(EValidationErrorMessage.InvalidInput)
    }
    if (!pw) {
      throw new ValidationError(EValidationErrorMessage.InvalidInput)
    }
    log('not member', user.name)
  }
}

export type CreateInput = {
  data: PostUserInput
  user: User
}
