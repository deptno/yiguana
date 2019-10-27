import {S3Input} from '../../entity/input/s3'
import {ES3ErrorMessage, S3Error} from '../../entity/error'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'

export async function getPostContentUnSafe(op: S3Input, input: GetPostContentUnSafeInput): Promise<string> {
  try {
    const content = await op.s3.getObject({
      Bucket: op.bucketName,
      Key: input.data.hk
    })

    return content.toString()
  } catch (e) {
    console.error(e)
    throw new S3Error(ES3ErrorMessage.FailToGet)
  }
}

export type GetPostContentUnSafeInput = {
  data: YiguanaDocumentHash
}
