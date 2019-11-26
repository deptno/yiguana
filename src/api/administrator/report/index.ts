import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {logApiAdminReport} from '../../../lib/log'
import {ReportsInput} from '../../../store/dynamodb/reports'

export class ReportApi {
  constructor(private ms: MetadataStore, private ef: EntityFactory) {
  }

  list(input: ReportsInput) {
    logApiAdminReport('list', input)
    return this.ms.reports(input)
  }
}