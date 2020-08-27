import {DynamoDbDocument} from './abstract'

export class Comment extends DynamoDbDocument {
  static of(d: Yiguana.CommentDocument) {
    if (d) {
      return new Comment(d)
    }
  }
}
