import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {logApiAdminReport} from '../../../lib/log'
import {ReportsInput} from '../../../store/dynamodb/reports'
import {ReportsAllInput} from '../../../store/dynamodb/reports-all'

export class ReportApi {
  constructor(private ms: MetadataStore, private ef: EntityFactory) {
  }

  all(input: ReportsAllInput) {
    logApiAdminReport('all', input)
    return this.ms.reportsAll(input)
  }

  list(input: ReportsInput) {
    logApiAdminReport('list', input)
    return this.ms.reports(input)
  }
}