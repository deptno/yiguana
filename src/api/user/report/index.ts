import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {list, ReportsInput} from './list'
import {create, ReportApiInput} from './create'

export class UserReportApi {
  constructor(private ms: MetadataStore, private ef: EntityFactory) {
  }

  list(input: ReportsInput) {
    return list(this.ms, this.ef, input)
  }

  create(input: ReportApiInput) {
    return create(this.ms, this.ef, input)
  }
}