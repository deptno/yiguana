import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {AggReportApi} from './agg-report'
import {ReportApi} from './report'
import {replyReport, ReplyReportApiInput} from './reply-report'

export class AdministratorApi {
  aggReport = new AggReportApi(this.ms, this.ef)
  report = new ReportApi(this.ms, this.ef)

  constructor(private ms: MetadataStore, private ef: EntityFactory) {
  }

  replyReport(input: ReplyReportApiInput) {
    return replyReport(this.ms, this.ef, input)
  }
}
