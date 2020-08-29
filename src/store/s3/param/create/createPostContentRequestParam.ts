import {uuid} from '../../../../lib/uuid'
import {S3} from 'aws-sdk'

export function createPostContentRequestParam(input: Input): S3.PutObjectRequest {
  const id = uuid()

  return {
    Bucket: input.bucketName,
    Key: id,
    Body: input.content,
    ContentType: 'plain/text',
  }
}

type Input = {
  bucketName: string
  content: string
}
