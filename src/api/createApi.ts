import {createDynamoDB} from '@deptno/dynamodb'
import {createS3} from '@deptno/s3'
import {DocumentClient} from 'aws-sdk/clients/dynamodb'
import {S3} from 'aws-sdk'
import {ContentStore} from '../store/s3'
import {PostApi} from './post'
import {CommentApi} from './comment'
import {ReplyApi} from './reply'
import {UserApi} from './user'
import {MetadataStore} from '../store/dynamodb/params/create'
import {AdministratorApi} from './administrator'
import {CommonApi} from './common'
import {logMain} from '../lib/log'

export function createApi(params: CreateInput) {
  const {ddbClient, ddbTableName, s3Client, s3BucketName, s3MaxContentLength, s3MinContentLength} = params
  const ms = new MetadataStore({
    dynamodb: createDynamoDB(ddbClient),
    tableName: ddbTableName,
  })
  const cs = new ContentStore(
    {
      s3: createS3(s3Client),
      bucketName: s3BucketName,
    },
    {
      contentLengthRange: {
        min: s3MinContentLength,
        max: s3MaxContentLength,
      }
    },
  )

  logMain('createApi params: %j %j %j %j', ddbTableName, s3BucketName, s3MaxContentLength, s3MinContentLength)

  return {
    common: new CommonApi(ms, cs),
    post: new PostApi(ms, cs),
    comment: new CommentApi(ms),
    reply: new ReplyApi(ms),
    user: new UserApi(ms),
    administrator: new AdministratorApi(ms),
  }
}

type CreateInput = {
  s3BucketName: string
  s3Client: S3
  s3MinContentLength: number
  s3MaxContentLength: number
  ddbClient: DocumentClient
  ddbTableName: string
}
