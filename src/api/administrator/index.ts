import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {ReportApi} from './report'

export class AdministratorApi {
  public report = new ReportApi(this.ms, this.ef)

  constructor(private ms: MetadataStore, private ef: EntityFactory) {
  }
}