import {DynamoDbDocument} from './abstract'

export class Reply extends DynamoDbDocument {
  static of(d: Yiguana.ReplyDocument) {
    if (d) {
      return new Reply(d)
    }
  }
}
