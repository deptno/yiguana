import {S3Input} from '../../entity/input/s3'
import {PostContent, PostUserInput} from '../../entity/post'
import {uuid} from '../../lib/uuid'
import {ES3ErrorMessage, S3Error} from '../../entity/error'

export async function createPostContentUnSafe(op: S3Input, input: CreatePostContentUnSafeInput): Promise<PostContent> {
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


export type CreatePostContentUnSafeInput = PostUserInput
