import {S3Input} from '../../entity/input/s3'
import {extname} from 'path'
import {lookup} from 'mime-types'
import {uuid} from '../../lib/uuid'
import {ContentStoreOption} from '../../type'

export const getUploadUrl = (op: S3Input, option: ContentStoreOption, input: GetUploadUrlInput) => {
  const datetime = new Date().toISOString().replace('T', '/')
  const ext = extname(input.key)
  const mime = lookup(ext) as string

  if (supports.every(s => mime.startsWith(s))) {
    throw new Error('unsupported file type')
  }

  const {min, max} = option.contentLengthRange
  const preSignedPost = op.s3.raw.createPresignedPost({
    Bucket: op.bucketName,
    Fields: {
      key: `${datetime}-media-${uuid()}${ext}`
    },
    Conditions: [
      ['starts-with', '$content-type', mime],
      ['content-length-range', min, max],
    ],
    Expires: 60,
  })

  return JSON.stringify(preSignedPost)
}

export type GetUploadUrlInput = {
  key: string
  userId?: string
}

const supports = ['image', 'video']
