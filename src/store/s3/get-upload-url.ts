import {S3Input} from '../../entity/input/s3'

export const getUploadUrl = (op: S3Input, input: GetUploadUrlInput) => {
  const preSignedPost = op.s3.raw.createPresignedPost({
    Bucket: op.bucketName,
    Fields: {
      key: input.key,
    },
    Conditions: [
      ['starts-with', '$Content-Type', 'image/'],
    ],
    Expires: 60
  })

  if (input.userId) {
    preSignedPost.fields['x-amz-meta-userid'] = input.userId
  }

  return JSON.stringify(preSignedPost)
}

export type GetUploadUrlInput = {
  key: string
  userId?: string
}
