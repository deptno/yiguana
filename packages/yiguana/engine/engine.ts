import {Post} from '../entity/post'
import {ListInput} from './db/list'
import {PostDocument} from './db/document'

export type Engine = {
  addPost(post: Post): Promise<PostDocument>
  removePost(id: string): Promise<boolean>
  viewPost(id: PostDocument): Promise<PostDocument>
  likePost(id: PostDocument): Promise<PostDocument>
  list(params: ListInput): Promise<any>
}
export enum EEngine {
  DynamoDb = 'dynamodb'
}
