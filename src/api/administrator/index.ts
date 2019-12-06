import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {AggReportApi} from './agg-report'
import {ReportApi} from './report'
import {get, GetApiInput} from './get'
import {replyReport, ReplyReportApiInput} from './reply-report'
import {YiguanaDocument} from '../../type'

export class AdministratorApi {
  aggReport = new AggReportApi(this.ms, this.ef)
  report = new ReportApi(this.ms, this.ef)

  constructor(private ms: MetadataStore, private ef: EntityFactory) {
  }

  get<T extends YiguanaDocument>(input: GetApiInput) {
    return get<T>(this.ms, this.ef, input)
  }

  replyReport(input: ReplyReportApiInput) {
    return replyReport(this.ms, this.ef, input)
  }
}
