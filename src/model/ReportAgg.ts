import {DynamoDbDocument} from './abstract'

export class ReportAgg extends DynamoDbDocument {
  static of(d: YiguanaDocument.ReportAgg) {
    if (d) {
      return new ReportAgg(d)
    }
  }
}
