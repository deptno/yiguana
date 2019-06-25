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
  const {content, board, ...ddbPost} = post

  const item = dynamodbDoc(ddbPost)
  const id = createIdKey()
  const order = createPostOrderKey({
    boardName: board,
    category: ddbPost.category,
  })
  const range = createRangeKey(EType.Post)
  const _type = extractType(range)

  const doc = {
    ...item,
    _type,
    range,
    order,
    id,
    board,
  } as PostDocument

  const s3 = await _uploadContent(params.bucketName, doc, content)

  const putParams = {
    TableName: tableName,
    Item     : {
      ...doc,
      s3
    }
  }
  return await put<PostDocument>(client, putParams)
}

async function _uploadContent(bucket, post: PostDocument, content): Promise<string> {
  const day = new Date().toISOString().slice(0, 10)
  const key = `post/${day}/${post.id}`
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
