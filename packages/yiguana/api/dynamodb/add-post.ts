import {DynamoDbApiInput, EType, PostDocument} from './common'
import {put} from '../../../dynamodb/common'
import {put as putS3} from '../../../s3/s3'
import {dynamodbDoc} from '../../../dynamodb/document'
import {Post} from '../../entity/post'
import {createPostOrderKey} from './key/order'
import {createIdKey} from './key/id'
import {createRangeKey} from './key/range'
import {extractType} from './key/type'
import {YIGUANA_BUCKET} from '../../../../env'
import {getLinks} from '../../../lib/string-parser'

export async function addPost(params: DynamoDbApiInput & AddPostInput) {
  const {client, tableName, boardName, post} = params
  const {content, ...ddbPost} = post

  const item = dynamodbDoc(ddbPost)
  const id = createIdKey()
  const board = boardName
  const order = createPostOrderKey({
    boardName,
    category: ddbPost.category,
  })
  const range = createRangeKey(EType.Post)
  const _type = extractType(range)

  await _uploadContent(content)
  const putParams = {
    TableName: tableName,
    Item     : {
      ...item,
      _type,
      range,
      board,
      order,
      id,
//      link,
//      image,
    }
  }
  return await put<PostDocument>(client, putParams)
}

async function _uploadContent(content) {

}
function _parseContent(content) {
  const ret = {} as any
  const [link] = getLinks(content)
  if (link) {
    ret.link = link
  }
  //todo image 처리
  return ret
}

async function _uploadToS3(key: string, content: string) {
  const response = await putS3({
    Key: key,
    Bucket: YIGUANA_BUCKET,
    Body: content,
    ContentType: 'plain/text'
  })
  console.log({response})
  if (response) {
    return response.$response.data
  }
}
export type AddPostInput = {
  post: Post
  boardName: string
}
