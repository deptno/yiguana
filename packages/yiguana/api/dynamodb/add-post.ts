import {DynamoDbApiInput, EType, PostDocument} from './common'
import {put} from '../../../dynamodb/common'
import {put as putS3} from '../../../s3/s3'
import {dynamodbDoc} from '../../../dynamodb/document'
import {Post} from '../../entity/post'
import {createPostOrderKey} from './key/order'
import {createIdKey} from './key/id'
import {createRangeKey} from './key/range'
import {extractType} from './key/type'
import {getLinks} from '../../../lib/string-parser'

export async function addPost(params: DynamoDbApiInput & AddPostInput) {
  const {client, tableName, post} = params
  const {content, board, createdAt, ...ddbPost} = post

  // todo post validation

  const id = createIdKey()
  const order = createPostOrderKey({
    boardName: board,
    category : ddbPost.category,
  })
  const range = createRangeKey(EType.Post)
  const _type = extractType(range)
  const s3 = await _uploadContent(params.bucketName, id, content, createdAt.slice(0, 10))

  const item: PostDocument = dynamodbDoc({
    ...ddbPost,
    _type,
    range,
    order,
    id,
    board,
    createdAt,
    s3
  })

  const putParams = {
    TableName: tableName,
    Item     : item
  }
  return await put<PostDocument>(client, putParams)
}

async function _uploadContent(bucket, id, content, day): Promise<string> {
  const key = `post/${day}/${id}`
  const success = await putS3({
    Bucket     : bucket,
    Key        : key,
    ContentType: 'plain/text',
    Body       : content,
  })
  if (success) {
    return key
  }
  return ''
}

export type AddPostInput = {
  post: Post
}
