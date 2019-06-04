import {DocumentClient} from 'aws-sdk/clients/dynamodb'
import {Engine} from '../engine'
import {put} from '../../../dynamodb/common'
import {dynamodbDoc} from '../../../dynamodb/document'
import {v4} from 'uuid'
import {curryList} from './list'
import {DynamoDbDocument, EType} from './table-index'
import {Post} from '../../entity/post'

export function create(params: CreateInput): Engine {
  const {client, tableName, boardName} = params
  return {
    list: curryList(params),
    async addPost(post: Post) {
      const item = dynamodbDoc(post)
      const _type = EType.Post
      const id = v4()
      const board = boardName
      const order = [boardName, '중식', new Date().toISOString()].join('#')
      const range = 'post'

      let params1 = {
        TableName: tableName,
        Item: {
          ...item,
          _type,
          range,
          board,
          order,
          id
        }
      }
      const response = await put<DynamoDbDocument<Post>>(client, params1)
      console.log({params1, response})
      return
    }
  }
}

export type CreateInput = {
  tableName: string
  boardName: string
  client: DocumentClient
}
