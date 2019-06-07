import {DynamoDbApiInput, EType, PostDocument} from './common'
import {put} from '../../../dynamodb/common'
import {dynamodbDoc} from '../../../dynamodb/document'
import {Post} from '../../entity/post'
import {v4} from 'uuid'

export async function addPost(params: DynamoDbApiInput & AddPostInput) {
  const {client, tableName, boardName, post} = params
  const item = dynamodbDoc(post)
  const _type = EType.Post
  const id = v4()
  const board = boardName
  const order = [
    boardName,
    post.category,
    new Date().toISOString()
  ].join('#')

  const range = 'post'
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
