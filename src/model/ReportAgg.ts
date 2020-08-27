import {DynamoDbDocument} from './abstract'

export class ReportAgg extends DynamoDbDocument {
  static of(d: Yiguana.ReportAggDocument) {
    if (d) {
      return new ReportAgg(d)
    }
  }
}
