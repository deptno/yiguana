import {createS3} from '@deptno/s3'

export async function uploadS3(s3: ReturnType<typeof createS3>, params: UploadS3Input) {
  const response = await s3.putObject({
    Bucket: params.bucket,
    Key: params.postId,
  })
  console.log(JSON.stringify(response))
}

type UploadS3Input = {
  postId: string,
  bucket: string,
  content: string
}
