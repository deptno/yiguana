import {compose} from '../../lib/compose'
import {Post} from '../../model'
import {then} from '../../lib/then'
import {merge} from '../../lib/merge'
import {objOf} from '../../lib/objOf'
import {createPostDocument} from '../../store/dynamodb/model/create'
import {incView} from '../../store/dynamodb/param/update'
import {getPosts, getPostsByCategory} from '../../store/dynamodb/param/read'
import {logApiPost as log} from '../../lib/log'
import {removePost} from '../../store/dynamodb/param/delete'
import {EntityType} from '../../enum'

export function createPostApi({dynamodb, s3}) {
  return {
    create: compose<{ data: Yiguana.PostContent, user: Yiguana.User }, Promise<Post | undefined>>(
      then(Post.of),
      dynamodb.put,
      merge({TableName: 'test-yiguana'}),
      objOf('Item'),
      dynamodb.util.js2DdbDoc,
      createPostDocument,
    ),
    list: compose<Yiguana.ApiInput<DynamoDB.Pagination & { category?: string }>, Promise<any>>(
      then(t => {
        return {
          ...t,
          items: Post.ofList(t.items),
        }
      }),
      dynamodb.query,
      dynamodb.util.js2DdbDoc,
      merge({TableName: 'test-yiguana'}),
      (input) => {
        if ('category' in input.data) {
          return getPostsByCategory(input.data)
        }
        return getPosts(input.data)
      },
    ),
    view: compose(
      then(compose(Post.of, t => t.Attributes)),
      dynamodb.update,
      merge({TableName: 'test-yiguana'}),
      incView,
      t => t.data,
    ),
    del: compose<Yiguana.ApiInputWithUser<Yiguana.Document>, Promise<Post|undefined>>(
      then(compose(Post.of, t => t.Attributes)),
      dynamodb.update,
      merge({TableName: 'test-yiguana'}),
      (input: Yiguana.ApiInputWithUser<Yiguana.Document>) => {
        return removePost({
          hk: input.data.hk,
          rk: EntityType.Post,
          user: input.user
        })
      }
    ),
  }
}