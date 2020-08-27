import {MetadataStore} from '../../store/dynamodb/params/create'
import {ContentStore} from '../../store/s3'
import {assertNotEmptyString, assertsMemberOrNot} from '../../lib/assert'
import {logApiPost as log} from '../../lib/log'
import {Post} from '../../model'

export async function create(ms: MetadataStore, cs: ContentStore, input: CreateApiInput) {
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
  const post = Post.of({
    user,
    data: content,
  })

  return ms.put<Post>(post)
}

export type CreateApiInput = Yiguana.ApiInputWithUser<PostUserInput>

