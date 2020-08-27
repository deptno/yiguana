import {DynamoDbDocument} from './abstract'

export class Post extends DynamoDbDocument {
  static of(d: YiguanaDocument.Post) {
    if (d) {
      return new Post(d)
    }
  }
}
