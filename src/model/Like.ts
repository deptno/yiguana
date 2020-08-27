import {DynamoDbDocument} from './abstract'

export class Like extends DynamoDbDocument {
  static of(d: Yiguana.LikeDocument) {
    if (d) {
      return new Like(d)
    }
  }
}
