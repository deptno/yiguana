import {createDynamoDB} from '@deptno/dynamodb'
import {createS3} from '@deptno/s3'
import {DocumentClient} from 'aws-sdk/clients/dynamodb'
import {S3} from 'aws-sdk'
import {createStore} from '../store/dynamodb/dynamodb'
import {createEntityFactory} from '../entity'
import {Post} from '../entity/post'
import {createPostApi} from './post'
import {createCommentApi} from './comment'
import {createReplyApi} from './reply'

export function createApi(params: CreateInput): YiguanaApi<Post> {
  const {ddbClient, s3Client, bucketName, tableName} = params
  const dynamodb = createDynamoDB(ddbClient)
  const s3 = createS3(s3Client)
  const store = createStore({dynamodb, tableName})
  const ep = createEntityFactory({s3, bucketName})

  return {
    post: createPostApi(store, ep),
    comment: createCommentApi(store, ep),
    reply: createReplyApi(store, ep),
  }
}

export interface YiguanaApi<P> {
  post
  comment
  reply

//  report: ApiReport
}

type CreateInput = {
  ddbClient: DocumentClient
  s3Client: S3
  tableName: string
  bucketName: string
}
