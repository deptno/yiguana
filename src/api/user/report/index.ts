import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {logApiUserReport} from '../../../lib/log'
import {report, ReportInput} from './report'
import {reports, ReportsInput} from './reports'

export class UserReportApi {
  constructor(private ms: MetadataStore, private ef: EntityFactory) {
  }

  list(input: ReportsInput) {
    logApiUserReport('list', input)
    return reports(this.ms, this.ef, input)
  }

  create(input: ReportInput) {
    logApiUserReport('create', input)
    return report(this.ms, this.ef, input)
  }
}