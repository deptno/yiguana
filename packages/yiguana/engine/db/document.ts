import {DdbAuthorDocument, DdbCategoryDocument} from './table-index'
import {Post} from '../../entity/post'
import {Author} from '../../entity/author'

export type PostDocument = DdbCategoryDocument<Post>
export type AuthorDocument = DdbAuthorDocument<Author>
