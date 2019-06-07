import {DocumentClient} from 'aws-sdk/clients/dynamodb'
import {Engine} from '../engine'
import {del, put, update} from '../../../dynamodb/common'
import {dynamodbDoc} from '../../../dynamodb/document'
import {v4} from 'uuid'
import {curryList} from './list'
import {EType} from './table-index'
import {Post} from '../../entity/post'
import {PostDocument} from './document'

export function create(params: CreateInput): Engine {
  const {client, tableName, boardName} = params
  const range = 'post'
  return {
    list: curryList(params),
    async addPost(post: Post) {
      const item = dynamodbDoc(post)
      const _type = EType.Post
      const id = v4()
      const board = boardName
      const order = [
        boardName,
        post.category,
        new Date().toISOString()
      ].join('#')

      let params1 = {
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
      return await put<PostDocument>(client, params1)
    },
    async removePost(id: string) {
      const response = await del(client, {
        ReturnConsumedCapacity: 'TOTAL',
        TableName             : tableName,
        Key                   : {
          id,
          range
        }
      })
      const wcu = response.ConsumedCapacity.CapacityUnits
//      console.log({wcu})
      return true
    },
    async viewPost(post: PostDocument) {
      const {id, range} = post
      const response = await update(client, {
        ReturnConsumedCapacity  : 'TOTAL',
        ReturnValues            : 'ALL_NEW',
        TableName               : tableName,
        Key                     : {
          id,
          range
        },
        UpdateExpression        : 'SET #v = #v + :v',
        ExpressionAttributeNames: {
          '#v': 'views'
        },
        ExpressionAttributeValues: {
          ':v': 1
        }
      })
      const wcu = response.ConsumedCapacity.CapacityUnits
//      console.log({wcu})
      return response.Attributes as PostDocument
    },
    async likePost(post: PostDocument) {
      const {id, range} = post
      const response = await update(client, {
        ReturnConsumedCapacity  : 'TOTAL',
        ReturnValues            : 'ALL_NEW',
        TableName               : tableName,
        Key                     : {
          id,
          range
        },
        UpdateExpression        : 'SET #v = #v + :v',
        ExpressionAttributeNames: {
          '#v': 'likes'
        },
        ExpressionAttributeValues: {
          ':v': 1
        }
      })
      const wcu = response.ConsumedCapacity.CapacityUnits
//      console.log({wcu})
      return response.Attributes as PostDocument
    }
  }
}

export type CreateInput = {
  tableName: string
  boardName: string
  client: DocumentClient
}
