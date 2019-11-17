import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {ReportsInput} from '../../../store/dynamodb/reports'

export class ReportApi {
  constructor(private ms: MetadataStore, private ef: EntityFactory) {
  }

  list(input: ReportsInput) {
    return this.ms.reports(input)
  }
}