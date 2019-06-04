import {Post} from '../../entity/post'
import {DocumentClient} from 'aws-sdk/clients/dynamodb'
import {Engine} from '../engine'
import {paginationQuerySafe, put} from '../../../dynamodb/common'
import {dynamodbDoc} from '../../../dynamodb/document'

export function create(params: CreateInput): Engine {
  const {client, tableName} = params
  return {
    list(nextToken?: string) {
      return paginationQuerySafe<Post>(
        client,
        {
          TableName: tableName,
        },
        nextToken
      )
    },
    async addPost(post) {
      const item = dynamodbDoc(post)
      return put(client, {
        TableName: tableName,
        Item: item
      })
    }
  }
}
export enum ERange {
  Board = 'board',
  Post  = 'post',
  Reply = 'reply',
}
export type DynamoDbDocument<T> = T & {
  id: string
  range: ERange
}
type CreateInput = {
  tableName: string
  client: DocumentClient
}
