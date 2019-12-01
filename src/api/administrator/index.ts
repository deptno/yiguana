import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {AggReportApi} from './agg-report'
import {GetInput} from '../../store/dynamodb/get'
import {logApiAdmin} from '../../lib/log'
import {ReportApi} from './report'
import {AggReportReplyInput} from '../../store/dynamodb/agg-report-reply'

export class AdministratorApi {
  public aggReport = new AggReportApi(this.ms, this.ef)
  public report = new ReportApi(this.ms, this.ef)

  constructor(private ms: MetadataStore, private ef: EntityFactory) {
  }

  get(input: GetInput) {
    logApiAdmin('get', input)
    return this.ms.get(input)
  }

  replyReport(input: AggReportReplyInput) {
    logApiAdmin('reply', input)

    const {hk, entity: rk, answer, status} = input

    // 누적객체를 일단 변경
    // 모든 신고 객체 가져온다
    return Promise.all([
      this.ms.aggReportReply(input),
      this.ms
        .reportsAll({
          data: {
            hk,
            rk,
          },
        })
        .then(reports => Promise.all(
          reports.map(r => this.ms.reportReply({
            hk: r.hk,
            rk: r.rk,
            answer,
            status,
          })),
        ))
        .then(results => results.every(Boolean)),
    ])
  }
}