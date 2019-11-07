import {MetadataStore} from '../../store/dynamodb'
import {PostUserInput} from '../../entity/post'
import {EntityFactory} from '../../entity'
import {User} from '../../entity/user'
import {EValidationErrorMessage, ValidationError} from '../../entity/error'
import {postLogger as log} from '../../lib/log'
import {ContentStore} from '../../store/s3'

export async function create(ms: MetadataStore, cs: ContentStore, e: EntityFactory, input: CreateInput) {
  log('create %j', input)

  validateUser(input.user)

  const {data, user} = input
  // FIXME: cs.create 는 throw 가능성(unsafe)이 있다.
  const content = await cs.create({
    ...data,
    title: data.title.trim(),
    content: data.content.trim(),
  })
  const post = e.createPost({
    user,
    data: content,
  })

  // FIXME: 유저 데이터 저장 필요한데 뜬금없이? 이 위치에서 호출해도 되는 건가
  const result = await ms.addUser({data: user})
  console.log({result})

  return ms.addPost({data: post})
}

const validateUser = (user: User) => {
  if ('id' in user) {
    // 회원
    log('member', user.id)
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
