import {S3Input} from '../../entity/input/s3'
import {PostContent, PostUserInput} from '../../entity/post'
import {uuid} from '../../lib/uuid'
import {ES3ErrorMessage, S3Error} from '../../entity/error'

export async function createPostContentUnSafe(op: S3Input, input: CreatePostContentUnSafeInput): Promise<PostContent> {
  const datetime = new Date().toISOString().replace('T', '/')
  const id = uuid()
  const key = `${datetime}-post-${id}`

  try {
    await op.s3.putObject({
      Bucket: op.bucketName,
      Key: key,
      Body: input.content,
      ContentType: 'plain/text',
    })
  } catch (e) {
    throw new S3Error(ES3ErrorMessage.FailToPut)
  }

  const contentUrl = `s3://${op.bucketName}/${key}`
  const postInput: PostContent = {
    id,
    input,
    contentUrl,
  }
  if (input.cover) {
    postInput.cover = input.cover
  }

  return postInput
}


export type CreatePostContentUnSafeInput = PostUserInput
