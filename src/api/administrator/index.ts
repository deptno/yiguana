import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {ReportApi} from './report'
import {GetInput} from '../../store/dynamodb/get'
import {logApiAdmin} from '../../lib/log'

export class AdministratorApi {
  public report = new ReportApi(this.ms, this.ef)

  constructor(private ms: MetadataStore, private ef: EntityFactory) {
  }

  get(input: GetInput) {
    logApiAdmin('get', input)
    return this.ms.get(input)
  }
}