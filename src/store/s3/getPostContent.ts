export async function getPostContentUnSafe(op: {s3, bucketName}, input: Input): Promise<string> {
  try {
    const content = await op.s3.getObject({
      Bucket: op.bucketName,
      Key: input.data.hk
    })

    return content.toString()
  } catch (e) {
    console.error(e)
    throw e
  }
}

export type Input = {
  data: Yiguana.Document
}
