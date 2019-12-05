import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {list, ReportListApiInput} from './list'
import {all, ReportAllApiInput} from './all'

export class ReportApi {
  constructor(private ms: MetadataStore, private ef: EntityFactory) {
  }

  all(input: ReportAllApiInput) {
    return all(this.ms, this.ef, input)
  }

  list(input: ReportListApiInput) {
    return list(this.ms, this.ef, input)
  }
}