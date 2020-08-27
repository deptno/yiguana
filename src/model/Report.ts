import {DynamoDbDocument} from './abstract'

export class Report extends DynamoDbDocument {
  static of(d: YiguanaDocument.Report) {
    if (d) {
      return new Report(d)
    }
  }
}
