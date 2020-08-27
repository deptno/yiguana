import {DynamoDbDocument} from './abstract'

export class Comment extends DynamoDbDocument {
  static of(d: YiguanaDocument.Comment) {
    if (d) {
      return new Comment(d)
    }
  }
}
