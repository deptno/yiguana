import {DynamoDbDocument} from './abstract'

export class Report extends DynamoDbDocument {
  static of(d: Yiguana.ReportDocument) {
    if (d) {
      return new Report(d)
    }
  }
}
