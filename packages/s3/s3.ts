import {S3} from 'aws-sdk'

const s3 = new S3()

export async function get(params: S3.Types.GetObjectRequest) {
  try {
    const response = await s3
      .getObject(params)
      .promise()
    return response.Body
  } catch (e) {
    if (e.code === 'NoSuchKey') {
      console.log(`[ok] ${params.Key} doesn't exists`)
    } else {
      console.error('error get')
      console.error(e)
    }
  }
}
export async function put(params: S3.Types.PutObjectRequest) {
  try {
    return await s3
      .putObject({
        ContentType: 'application/json',
        ...params
      })
      .promise()
  } catch (e) {
    console.error('error')
    console.error(e)
  }
}
export async function del(bucket) {

}
