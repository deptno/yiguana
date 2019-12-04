import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {AggReportApi} from './agg-report'
import {GetInput} from '../../store/dynamodb/get'
import {logApiAdmin} from '../../lib/log'
import {ReportApi} from './report'
import {replyReport, ReplyReportInput} from './reply-report'

export class AdministratorApi {
  public aggReport = new AggReportApi(this.ms, this.ef)
  public report = new ReportApi(this.ms, this.ef)

  constructor(private ms: MetadataStore, private ef: EntityFactory) {
  }

  get(input: GetInput) {
    logApiAdmin('get', input)
    return this.ms.get(input)
  }

  replyReport(input: ReplyReportInput) {
    logApiAdmin('replyReport', input)
    return replyReport(this.ms, this.ef, input)
  }
}