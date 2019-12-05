import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {AggReportApi} from './agg-report'
import {ReportApi} from './report'
import {get, GetApiInput} from './get'
import {reportReply, ReportReplyApiInput} from './report-reply'

export class AdministratorApi {
  aggReport = new AggReportApi(this.ms, this.ef)
  report = new ReportApi(this.ms, this.ef)

  constructor(private ms: MetadataStore, private ef: EntityFactory) {
  }

  get(input: GetApiInput) {
    return get(this.ms, this.ef, input)
  }

  replyReport(input: ReportReplyApiInput) {
    return reportReply(this.ms, this.ef, input)
  }
}