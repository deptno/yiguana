import {MetadataStore} from '../../store/dynamodb'
import {PostUserInput} from '../../entity/post'
import {EntityFactory} from '../../entity'
import {User} from '../../entity/user'
import {logApiPost} from '../../lib/log'
import {ContentStore} from '../../store/s3'
import {UserApiInput} from '../../type'
import {assertNotEmptyString, assertsMember, assertsNotMember} from '../../lib/assert'

export async function create(ms: MetadataStore, cs: ContentStore, e: EntityFactory, input: CreateInput) {
  log('create %j', input)

  validateUser(input.user)
  assertNotEmptyString(input.data.content)

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

  return ms.addPost({data: post})
}

const validateUser = (user: User) => {
  if ('id' in user) {
    // 회원
    assertsMember(user)
    log('member', user.id)
  } else {
    // TODO: 비회원, 비회원이 우선순위
    assertsNotMember(user)
    log('not member', user.name)
  }
}

export type CreateInput = UserApiInput<PostUserInput>

const log = logApiPost.extend('create')
