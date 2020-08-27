import {DynamoDbDocument} from './abstract'

export class Reply extends DynamoDbDocument {
  static of(d: YiguanaDocument.Reply) {
    if (d) {
      return new Reply(d)
    }
  }
}
