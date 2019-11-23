import {createPost, CreatePostInput, Post} from './post'
import {Comment, createComment, CreateCommentInput} from './comment'
import {createReply, CreateReplyInput} from './reply'
import {createLike, CreateLikeInput} from './like'
import {createReport, CreateReportInput} from './report'
export {User} from './user'
export {Post} from './post'
export {Comment} from './comment'

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
  createLike<T extends Post | Comment>(input: CreateLikeInput<T>) {
    return createLike<T>(input)
  }
  createReport<T extends Post | Comment>(input: CreateReportInput<T>) {
    return createReport<T>(input)
  }
}
