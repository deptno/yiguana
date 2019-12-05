import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {AggReportListApiInput, list} from './list'

export class AggReportApi {
  constructor(private ms: MetadataStore, private ef: EntityFactory) {
  }

  list(input: AggReportListApiInput) {
    return list(this.ms, this.ef, input)
  }
}