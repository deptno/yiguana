import {createDynamoDB} from '@deptno/dynamodb'
import {createS3} from '@deptno/s3'
import {DocumentClient} from 'aws-sdk/clients/dynamodb'
import {S3} from 'aws-sdk'
import {createStore} from '../store/dynamodb/dynamodb'
import {createEntityFactory} from '../entity'
import {addPost, ApiAddPost} from './add-post'
import {addComment, ApiAddComment} from './add-comment'
import {Post} from '../entity/post'
import {ApiGetPosts, getPosts} from './get-posts'
import {ApiGetPost, getPost} from './get-post'

export function createApi(params: CreateInput): YiguanaApi<Post> {
  const {ddbClient, s3Client, bucketName, tableName} = params
  const dynamodb = createDynamoDB(ddbClient)
  const s3 = createS3(s3Client)
  const store = createStore({dynamodb, tableName})
  const ep = createEntityFactory({s3, bucketName})

  return {
    getPosts: getPosts.bind(null, store, ep),
    getPost: getPost.bind(null, store, ep),
    addPost: addPost.bind(null, store, ep),
//    likePost: likePost.bind(null, store, ep),
//    removePost: removePost.bind(null, store, ep),

    addComment: addComment.bind(null, store, ep),
//    removeComment: removeComment.bind(null, store, ep),

//    addReply: addReply.bind(null, store, ep),
//    removeReply: removeReply.bind(null, store, ep),
  }
}

export interface YiguanaApi<P> {
  getPosts: ApiGetPosts,
  getPost: ApiGetPost,
  addPost: ApiAddPost,
  addComment: ApiAddComment,
}
type CreateInput = {
  ddbClient: DocumentClient
  s3Client: S3
  tableName: string
  bucketName: string
}
