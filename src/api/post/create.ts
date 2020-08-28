import {assertNotEmptyString, assertsMemberOrNot} from '../../lib/assert'
import {logApiPost as log} from '../../lib/log'
import {Post} from '../../model'
import {createPostDocument} from '../../store/dynamodb/model/create'

export async function create(input: Input) {
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
  const post = createPostDocument({
    user,
    data: content,
  })

  return ms.put<Post>(post)
}

export type Input = Yiguana.ApiInputWithUser<PostUserInput>

