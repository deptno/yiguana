import {DynamoDbDocument} from './abstract'

export class Post extends DynamoDbDocument {
  static of(d: Yiguana.PostDocument) {
    if (d) {
      return new Post(d)
    }
  }
  static ofList(ds: Yiguana.PostDocument[]) {
    return ds.map(Post.of)
  }
}
