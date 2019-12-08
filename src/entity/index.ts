import {createPost, CreatePostInput, Post} from './post'
import {Comment, createComment, CreateCommentInput, createReply, CreateReplyInput, Reply} from './comment'
import {createLike, CreateLikeInput} from './like'
import {createReport, CreateReportInput} from './report'

export * from './user'
export * from './post'
export * from './comment'
export * from './report'
export * from './like'

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

  createLike<T extends Post | Comment | Reply>(input: CreateLikeInput<T>) {
    return createLike<T>(input)
  }

  createReport<T extends Post | Comment | Reply>(input: CreateReportInput<T>) {
    return createReport<T>(input)
  }
}
