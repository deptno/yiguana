import {createS3} from '@deptno/s3'

export async function uploadS3(s3: ReturnType<typeof createS3>, params: Upload{s3, bucketName}) {
  const response = await s3.putObject({
    Bucket: params.bucket,
    Key: params.postId,
  })
  console.log(JSON.stringify(response))
}

type Upload{s3, bucketName} = {
  postId: string,
  bucket: string,
  content: string
}
