import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {list, ReportsInput} from './list'
import {create, ReportApiInput} from './create'

export class UserReportApi {
  constructor(private ms: MetadataStore, private ef: EntityFactory) {
  }

  create(input: ReportApiInput) {
    return create(this.ms, this.ef, input)
  }

  list(input: ReportsInput) {
    return list(this.ms, this.ef, input)
  }
}