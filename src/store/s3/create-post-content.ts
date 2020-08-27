import {uuid} from '../../lib/uuid'

export async function createPostContentUnSafe(op: {s3, bucketName}, input: CreatePostContentUnSafeInput): Promise<PostContent> {
  const id = uuid()

  try {
    await op.s3.putObject({
      Bucket: op.bucketName,
      Key: id,
      Body: input.content,
      ContentType: 'plain/text',
    })
  } catch (e) {
    console.error(e)
    throw e
  }

  const contentUrl = `s3://${op.bucketName}/${id}`
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
