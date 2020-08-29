import * as authorize from './authorize'
import * as post from './post'
import {logApiPost as log, logMain} from '../lib/log'
import {compose} from '../lib/compose'
import {createDynamoDB} from '@deptno/dynamodb'
import {createS3} from '@deptno/s3'
import {assertNotEmptyString} from '../lib/assert'
import {tap} from '../lib/tap'
import {Post} from '../model'
import {createPostDocument} from '../store/dynamodb/model/create'
import {createPostContentRequestParam} from '../store/s3/model/create'
import {tapAwait} from '../lib/tapAwait'
import {then} from '../lib/then'
import {merge} from '../lib/merge'
import {objOf} from '../lib/objOf'
import {getPosts, getPostsByCategory} from '../store/dynamodb/param/read'
import {ContentStore} from '../store/s3'
import {ViewApiInput} from './post'
import {incView} from '../store/dynamodb/param/update'

export function createApi(input: Input) {
  const {dynamodb, s3} = input

  logMain('createApi params: %j', input)

  return {
    authorize,
    content: {
      create: compose<{ bucketName: string, content: string }, Promise<{ Key }>>(
        tapAwait(s3.putObject),
        createPostContentRequestParam,
        tap(compose(assertNotEmptyString, t => t?.content)),
      ),
    },
    post: {
      create: compose<{ data: Yiguana.PostContent, user: Yiguana.User }, Promise<Post | undefined>>(
        then(Post.of),
        dynamodb.put,
        merge({TableName: 'test-yiguana'}),
        objOf('Item'),
        dynamodb.util.js2DdbDoc,
        createPostDocument,
      ),
      list: compose<Yiguana.ApiInput<DynamoDB.Pagination & { category: string }>, Promise<any>>(
        then(
          compose(
            t => {
              return {
                ...t,
                items: Post.ofList(t.items),
              }
            },
            tap(console.log),
          )

        ),
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
        input => {
          return Promise.all([
            s3.getObject({
              Bucket: 'test-yiguana',
              Key: input.data.hk,
            }),
            incView(input.data),
          ])
            .then(response => {
              console.log('view', response)
            })
        },
      ),
      del: compose(
        dynamodb.update,
        post.del,
      ),
    },
  }
}

type Input = {
  dynamodb: ReturnType<typeof createDynamoDB>
  s3: ReturnType<typeof createS3>
}

