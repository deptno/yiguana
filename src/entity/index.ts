import {createPost, createPostContentUnSafe, CreatePostInput, PostContent, PostUserInput} from './post'
import {S3Input} from './input/s3'

export function createEntityFactory(operator: S3Input): EntityFactory {
  return {
    createPostContent: createPostContentUnSafe.bind(null, operator),
    createPost: createPost.bind(null, operator),
  }
}
export type EntityFactory = {
  createPostContent(params: PostUserInput): Promise<PostContent>
  createPost(params: CreatePostInput): ReturnType<typeof createPost>
}
