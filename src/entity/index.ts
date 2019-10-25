import {S3Input} from './input/s3'
import {createPost, createPostContentUnSafe, PostContent, PostUserInput} from './post'
import {createComment} from './comment'
import {createReply} from './reply'

export function createEntityFactory(operator: S3Input): EntityFactory {
  return {
    createPostContent: createPostContentUnSafe.bind(null, operator),
    createPost,
    createComment,
    createReply,
  }
}
export type EntityFactory = {
  createPostContent(params: PostUserInput): Promise<PostContent>
  createPost: typeof createPost
  createComment: typeof createComment
  createReply: typeof createReply
}
