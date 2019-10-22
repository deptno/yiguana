import {S3Input} from './input/s3'
import {createPost, createPostContentUnSafe, CreatePostInput, PostContent, PostUserInput} from './post'
import {createComment, CreateCommentInput} from './comment'

export function createEntityFactory(operator: S3Input): EntityFactory {
  return {
    createPostContent: createPostContentUnSafe.bind(null, operator),
    createPost: createPost,
    createComment: createComment,
  }
}
export type EntityFactory = {
  createPostContent(params: PostUserInput): Promise<PostContent>
  createPost: typeof createPost
  createComment: typeof createComment
}
