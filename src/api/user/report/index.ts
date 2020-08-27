import {MetadataStore} from '../../../store/dynamodb/params/create'
import {list, ReportsInput} from './list'
import {create, ReportApiInput} from './create'

export class UserReportApi {
  constructor(private ms: MetadataStore) {
  }

  create(input: ReportApiInput) {
    return create(this.ms, input)
  }

  list(input: ReportsInput) {
    return list(this.ms, input)
  }
}