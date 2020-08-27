import {MetadataStore} from '../../../store/dynamodb'
import {list, ReportListApiInput} from './list'
import {all, ReportAllApiInput} from './all'

export class ReportApi {
  constructor(private ms: MetadataStore) {
  }

  all(input: ReportAllApiInput) {
    return all(this.ms, input)
  }

  list(input: ReportListApiInput) {
    return list(this.ms, input)
  }
}