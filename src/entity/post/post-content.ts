import {PostUserInput} from './user-input'
import {uuid} from '../../lib/uuid'
import {S3Input} from '../input/s3'
import {ES3ErrorMessage, S3Error} from '../error/s3-error'

export async function createPostContentUnSafe(op: S3Input, input: PostUserInput): Promise<PostContent> {
  const id = uuid()

  try {
    await op.s3.putObject({
      Bucket: op.bucketName,
      Key: id,
      Body: input.content,
      ContentType: 'plain/text',
    })
  } catch (e) {
    throw new S3Error(ES3ErrorMessage.FailToPut)
  }

  const contentUrl = `s3://${op.bucketName}/${id}`
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
export type PostContent = {
  id: string
  contentUrl: string
  cover?: string
  input: PostUserInput
}
