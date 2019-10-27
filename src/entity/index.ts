import {createPost, CreatePostInput} from './post'
import {createComment, CreateCommentInput} from './comment'
import {createReply, CreateReplyInput} from './reply'

export class EntityFactory {
  createPost(input: CreatePostInput) {
    return createPost(input)
  }
  createComment(input: CreateCommentInput) {
    return createComment(input)
  }
  createReply(input: CreateReplyInput) {
    return createReply(input)
  }
}
