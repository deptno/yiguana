import {PostUserInput} from './user-input'
import {createS3} from '@deptno/s3'
import {uuid} from '../../lib/uuid'

export async function createPostContentUnSafe(op: Operator, input: PostUserInput): Promise<PostContent> {
  const id = uuid()
  const response = await op.s3.putObject({
    Bucket: op.bucket,
    Key: id,
    Body: input.content,
    ContentType: 'plain/text',
  })
  const contentUrl = `s3://${op.bucket}/${id}`
  const postInput: PostContent = {
    id,
    input,
    contentUrl,
  }
  if (input.images) {
    postInput.cover = input.images[0]
  }

  return postInput
}
export type Operator = {
  s3: ReturnType<typeof createS3>
  bucket: string
}
export type PostContent = {
  id: string
  contentUrl: string
  cover?: string
  input: PostUserInput
}
