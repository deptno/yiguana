import {S3} from 'aws-sdk'
import {createS3} from '@deptno/s3'
import {createPost, createPostContentUnSafe, CreatePostInput, PostContent, PostUserInput} from './post'

export function createEntityFactory(params: CreateInput): Entity {
  const s3 = createS3(params.s3Client)
  const operator = {
    s3,
    bucketName: params.bucketName
  }
  return {
    createPostContent: createPostContentUnSafe.bind(null, operator),
    createPost: createPost.bind(null, operator),
  }
}
export type Entity = {
  createPostContent(params: PostUserInput): PostContent
  createPost(params: CreatePostInput): ReturnType<typeof createPost>
}
type CreateInput = {
  s3Client: S3
  bucketName: string
}
