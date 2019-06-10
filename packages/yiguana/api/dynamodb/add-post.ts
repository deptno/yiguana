import {DynamoDbApiInput, EType, PostDocument} from './common'
import {put} from '../../../dynamodb/common'
import {dynamodbDoc} from '../../../dynamodb/document'
import {Post} from '../../entity/post'
import {createPostOrderKey} from './key/order'
import {createIdKey} from './key/id'
import {createRangeKey} from './key/range'
import {extractType} from './key/type'

export async function addPost(params: DynamoDbApiInput & AddPostInput) {
  const {client, tableName, boardName, post} = params
  const item = dynamodbDoc(post)
  const id = createIdKey()
  const board = boardName
  const order = createPostOrderKey({
    boardName,
    category: post.category,
  })
  const range = createRangeKey(EType.Post)
  const _type = extractType(range)
  const putParams = {
    TableName: tableName,
    Item     : {
      ...item,
      _type,
      range,
      board,
      order,
      id
    }
  }
  return await put<PostDocument>(client, putParams)
}
export type AddPostInput = {
  post: Post
  boardName: string
}
