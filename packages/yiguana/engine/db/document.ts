import {DdbUserDocument, DdbCategoryDocument} from './table-index'
import {Post} from '../../entity/post'
import {User} from '../../entity/user'

export type PostDocument = DdbCategoryDocument<Post>
export type UserDocument = DdbUserDocument<User>
