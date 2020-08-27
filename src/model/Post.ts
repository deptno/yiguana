import {DynamoDbDocument} from './abstract'

export class Post extends DynamoDbDocument {
  static of(d: Yiguana.PostDocument) {
    if (d) {
      return new Post(d)
    }
  }
}
