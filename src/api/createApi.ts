import * as authorize from './authorize'
import {createPostApi} from './post'
import {logMain} from '../lib/log'
import {compose} from '../lib/compose'
import {createDynamoDB} from '@deptno/dynamodb'
import {createS3} from '@deptno/s3'
import {assertNotEmptyString} from '../lib/assert'
import {tap} from '../lib/tap'
import {createPostContentRequestParam} from '../store/s3/param/create'
import {tapAwait} from '../lib/tapAwait'

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
    post: createPostApi.bind(input),
    comment: createCommentApi.bind(input),
  }
}

type Input = {
  dynamodb: ReturnType<typeof createDynamoDB>
  s3: ReturnType<typeof createS3>
}

