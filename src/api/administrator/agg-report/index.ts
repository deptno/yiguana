import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {AggReportsInput} from '../../../store/dynamodb/agg-reports'
import {logApiAdminReport} from '../../../lib/log'

export class AggReportApi {
  constructor(private ms: MetadataStore, private ef: EntityFactory) {
  }

  list(input: AggReportsInput) {
    logApiAdminReport('list', input)
    return this.ms.aggReports(input)
  }
}