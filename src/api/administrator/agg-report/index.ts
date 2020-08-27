import {MetadataStore} from '../../../store/dynamodb/params/create'
import {AggReportListApiInput, list} from './list'

export class AggReportApi {
  constructor(private ms: MetadataStore) {
  }

  list(input: AggReportListApiInput) {
    return list(this.ms, input)
  }
}