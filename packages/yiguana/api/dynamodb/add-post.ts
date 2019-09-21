import {CreateApiInput, EType, PostDocument} from './common'
import {Post} from '../../entity/post'
import {createPostOrderKey} from './key/order'
import {createIdKey} from './key/id'
import {createRangeKey} from './key/range'
import {extractType} from './key/type'

export async function addPost(operator: CreateApiInput, params: AddPostInput) {
  const {dynamodb, tableName} = operator
  const {content, board, createdAt, ...ddbPost} = params.post

  // todo post validation

  const id = createIdKey()
  const order = createPostOrderKey({
    boardName: board,
    category : ddbPost.category,
  })
  const range = createRangeKey(EType.Post)
  const _type = extractType(range)
  const s3 = await _uploadContent(operator, id, content, createdAt.slice(0, 10))

  if (!s3) {
    console.error('fail to upload to s3')
    return
  }

  const item: PostDocument = dynamodb.util.js2DdbDoc({
    ...ddbPost,
    _type,
    range,
    order,
    id,
    board,
    createdAt,
    s3
  })

  return dynamodb.put({
    TableName: tableName,
    Item     : item
  })
}

async function _uploadContent(operator: CreateApiInput, id, content, day): Promise<string|undefined> {
  const key = `post/${day}/${id}`
  const success = await operator.s3.putObject({
    Bucket     : operator.bucketName,
    Key        : key,
    ContentType: 'plain/text',
    Body       : content,
  })
  if (success) {
    return key
  }
}

export type AddPostInput = {
  post: Post
}
