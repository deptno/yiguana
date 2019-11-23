import {S3Input} from '../../entity/input/s3'
import {extname} from 'path'
import {lookup} from 'mime-types'
import {uuid} from '../../lib/uuid'

export const getUploadUrl = (op: S3Input, input: GetUploadUrlInput) => {
  const datetime = new Date().toISOString()
    .replace(/-/g, '/')
    .replace('T', '/')
  const ext = extname(input.key)
  const mime = lookup(ext) as string

  if (supports.every(s => mime.startsWith(s))) {
    throw new Error('unsupported file type')
  }

  const preSignedPost = op.s3.raw.createPresignedPost({
    Bucket: op.bucketName,
    Fields: {
      key: `${datetime}-${uuid()}${ext}`
    },
    Conditions: [
      ['eq', '$acl', 'public-read'], // FIXME: 실사용시엔는 옵션 제거 후 클라우드 프론트 레이에서 처리
      ['starts-with', '$content-type', mime],
      ['content-length-range', 128, 1048579],
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