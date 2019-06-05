import {Post} from '../entity/post'
import {ListInput} from './db/list'
import {DdbCategoryDocument} from './db/table-index'

export type Engine = {
  addPost(post: Post): Promise<DdbCategoryDocument<Post>>
  removePost(id: string): Promise<boolean>
  viewPost(id: DdbCategoryDocument<Post>): Promise<DdbCategoryDocument<Post>>
  likePost(id: DdbCategoryDocument<Post>): Promise<DdbCategoryDocument<Post>>
  list(params: ListInput): Promise<any>
}
export enum EEngine {
  DynamoDb = 'dynamodb'
}
