import {createDynamoDB} from '@deptno/dynamodb'
import {createS3} from '@deptno/s3'
import {DocumentClient} from 'aws-sdk/clients/dynamodb'
import {S3} from 'aws-sdk'
import {ContentStore} from '../store/s3'
import {EntityFactory} from '../entity'
import {PostApi} from './post'
import {CommentApi} from './comment'
import {ReplyApi} from './reply'
import {MetadataStore} from '../store/dynamodb'

export function createApi(params: CreateInput) {
  const {ddbClient, s3Client, bucketName, tableName} = params
  const dynamodb = createDynamoDB(ddbClient)
  const s3 = createS3(s3Client)
  const metadataStore = new MetadataStore({dynamodb, tableName})
  const contentStore = new ContentStore({s3, bucketName})
  const ef = new EntityFactory()

  return {
    post: new PostApi(metadataStore, contentStore, ef),
    comment: new CommentApi(metadataStore, ef),
    reply: new ReplyApi(metadataStore, ef),
  }
}

type CreateInput = {
  ddbClient: DocumentClient
  s3Client: S3
  tableName: string
  bucketName: string
}
