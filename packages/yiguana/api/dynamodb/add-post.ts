import {CreateApiInput, EType, PostDocument} from './common'
import {Post} from '../../entity/post'
import {createPostOrderKey} from './key/order'
import {createHashKey} from './key/id'
import {createRangeKey} from './key/range'
import {extractType} from './key/type'

export async function addPost(operator: CreateApiInput, params: AddPostInput) {
  const {dynamodb, tableName} = operator
  const {board, createdAt, category, ...ddbPost} = params.post

  // todo post validation

  const hk = createHashKey()
  const order = createPostOrderKey({
    board,
    category,
  })
  const rk = createRangeKey(EType.Post)
  const _type = extractType(rk)
  // todo: 밖으로 옮기고 선 s3 후 dynamodb 작업

  const item: PostDocument = dynamodb.util.js2DdbDoc({
    hk,
    rk,
    _type,
    category,
    order,
    board,
    createdAt,
    ...ddbPost,
  })

  return dynamodb.put({
    TableName: tableName,
    Item: item,
  })
}

async function _uploadContent(operator: CreateApiInput, id, content, day): Promise<string | undefined> {
  const key = `post/${day}/${id}`
  const success = await operator.s3.putObject({
    Bucket: operator.bucketName,
    Key: key,
    ContentType: 'plain/text',
    Body: content,
  })
  if (success) {
    return key
  }
}

export type AddPostInput = {
  post: Post
}
