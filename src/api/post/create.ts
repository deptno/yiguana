import {MetadataStore} from '../../store/dynamodb'
import {Post, PostUserInput} from '../../entity/post'
import {EntityFactory} from '../../entity'
import {ContentStore} from '../../store/s3'
import {ApiInputWithUser} from '../../type'
import {assertNotEmptyString, assertsMemberOrNot} from '../../lib/assert'
import {logApiPost as log} from '../../lib/log'

export async function create(ms: MetadataStore, cs: ContentStore, e: EntityFactory, input: CreateApiInput) {
  log('create %j', input)

  assertsMemberOrNot(input.user)
  assertNotEmptyString(input.data.content)

  const {data, user} = input
  // cs.create 는 throw 가능성(unsafe)이 있다.
  const content = await cs.create({
    ...data,
    title: data.title.trim(),
    content: data.content.trim(),
  })
  const post = e.createPost({
    user,
    data: content,
  })

  return ms.put<Post>(post)
}

export type CreateApiInput = ApiInputWithUser<PostUserInput>

