import {createS3} from '@deptno/s3'

export type S3Input = {
  s3: ReturnType<typeof createS3>
  bucketName: string
}