import {DynamoDbApiInput} from './dynamodb/common'
import {ListInput, posts} from './dynamodb/posts'
import {addPost, AddPostInput} from './dynamodb/add-post'
import {removePost, RemovePostInput} from './dynamodb/remove-post'
import {viewPost, ViewPostInput} from './dynamodb/view-post'
import {likePost, LikePostInput} from './dynamodb/like-post'
import {addComment, AddCommentInput, addCommentParams} from './dynamodb/add-comment'
import {comments, CommentsInput} from './dynamodb/comments'
import {addCommentReply, AddCommentReplyInput, addCommentReplyParams} from './dynamodb/add-comment-reply'
import {commentReplies, CommentRepliesInput} from './dynamodb/comment-replies'
import {RemoveCommentInput} from './dynamodb/remove-comment'
import {login, LoginInput} from './dynamodb/login'
import {user, UserInput} from './dynamodb/user'
import {createPost} from '../entity/post'
import {createComment} from '../entity/comment'
import {createCommentReply} from '../entity/comment-reply'
import {commentPost, commentPostParams} from './dynamodb/comment-post'
import {transactWrite} from '../../dynamodb/common'
import {replyComment, replyCommentParams} from './dynamodb/reply-comment'
import {remove, RemoveInput} from './dynamodb/remove'

export class YiguanaApi {
  board = new Board(this.ddb)
  post = new Post(this.ddb)
  comment = new Comment(this.ddb)
  commentReply = new CommentReply(this.ddb)
  user = new User(this.ddb)
  raw = new Raw(this.ddb)

  constructor(private ddb: DynamoDbApiInput) {

  }
}

class Board {
  constructor(private ddb: DynamoDbApiInput) {
  }

  posts(params: ListInput) {
    return posts({...this.ddb, ...params})
  }

  addPost(params: AddPostInput) {
    return addPost({...this.ddb, ...params})
  }

  removePost(params: RemovePostInput) {
    return removePost({...this.ddb, ...params})
  }
}
class Post {
  constructor(private ddb: DynamoDbApiInput) {

  }

  create = createPost

  view(params: ViewPostInput) {
    return viewPost({...this.ddb, ...params})
  }

  like(params: LikePostInput) {
    return likePost({...this.ddb, ...params})
  }

  async addComment(params: AddCommentInput) {
// commentPost(params: CommentPostInput)  와 transaction
    // fixme id 만 받는 걸로 변경(commentPost)
    const post = {
      id   : params.comment.postId,
      range: 'post',
    }
    const commentPost = commentPostParams({...this.ddb, post})
    const addComment = addCommentParams({...this.ddb, ...params})
    await transactWrite([
      {Put: addComment},
      {Update: commentPost},
    ])
    return addComment.Item
  }

  comments(params: CommentsInput) {
    return comments({...this.ddb, ...params})
  }
}
class Comment {
  constructor(private ddb: DynamoDbApiInput) {

  }

  create = createComment

  addCommentReply(params: AddCommentReplyInput) {
//        replyComment(params: ReplyCommentInput) {
//        }
    // commentPost, replyComment 와 transaction
    const post = {
      id   : params.commentReply.postId,
      range: 'post',
    }
    const comment = {
      id: params.commentReply.commentId,
      range: 'comment'
    }
    const commentPost = commentPostParams({...this.ddb, post})
    const replyComment = replyCommentParams({...this.ddb, comment})
    const addCommentReply = addCommentReplyParams({...this.ddb, ...params})
    return transactWrite([
      {Put: addCommentReply},
      {Update: commentPost},
      {Update: replyComment},
    ])
  }

  commentReplies(params: CommentRepliesInput) {
    return commentReplies({...this.ddb, ...params})
  }
}
class CommentReply {
  constructor(private ddb: DynamoDbApiInput) {

  }

  create = createCommentReply

  removeComment(params: RemoveCommentInput) {
    console.log('todo removeComment')
  }
}

class User {
  constructor(private ddb: DynamoDbApiInput) {

  }

  login(params: LoginInput) {
    return login({...this.ddb, ...params})
  }

  user(params: UserInput) {
    return user({...this.ddb, ...params})
  }
}

class Raw {
  constructor(private ddb: DynamoDbApiInput) {

  }
  remove(params: RemoveInput) {
    return remove({...this.ddb, ...params})
  }
}

