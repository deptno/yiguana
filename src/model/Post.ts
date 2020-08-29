import {DynamoDbDocument} from './abstract'

export class Post extends DynamoDbDocument<Yiguana.PostDocument> {
  static of(d: Yiguana.PostDocument) {
    if (d) {
      return new Post(d)
    }
  }
  static ofList(ds: Yiguana.PostDocument[] = []) {
    return ds
      .filter(Boolean)
      .map(Post.of) as Post[]
  }

  public get hk() {
    return this._document.hk
  }
  public get views() {
    return this._document.views
  }
}