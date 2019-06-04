import {Post} from '../entity/post'

export type Engine = {
  addPost(post: Post): Promise<void>
  list(): Promise<any>
}
export enum EEngine {
  DynamoDb = 'dynamodb'
}
