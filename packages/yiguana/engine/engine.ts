import {Post} from '../entity/post'
import {ListInput} from './db/list'

export type Engine = {
  addPost(post: Post): Promise<void>
  list(params: ListInput): Promise<any>
}
export enum EEngine {
  DynamoDb = 'dynamodb'
}
