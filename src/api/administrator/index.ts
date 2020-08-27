import {MetadataStore} from '../../store/dynamodb/params/create'
import {AggReportApi} from './agg-report'
import {ReportApi} from './report'
import {replyReport, ReplyReportApiInput} from './reply-report'

export class AdministratorApi {
  aggReport = new AggReportApi(this.ms)
  report = new ReportApi(this.ms)

  constructor(private ms: MetadataStore) {
  }

  replyReport(input: ReplyReportApiInput) {
    return replyReport(this.ms, input)
  }
}
