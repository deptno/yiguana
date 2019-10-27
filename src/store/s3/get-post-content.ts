import {S3Input} from '../../entity/input/s3'
import {uuid} from '../../lib/uuid'
import {ES3ErrorMessage, S3Error} from '../../entity/error'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'

export async function getPostContentUnSafe(op: S3Input, input: GetPostContentUnSafeInput): Promise<string> {
  const id = uuid()

  try {
    const content = await op.s3.getObject({
      Bucket: op.bucketName,
      Key: id,
    })

    console.log({content})
    console.log({body: content.toString()})
    return content.toString()
  } catch (e) {
    throw new S3Error(ES3ErrorMessage.FailToGet)
  }
}

export type GetPostContentUnSafeInput = {
  data: YiguanaDocumentHash
}
