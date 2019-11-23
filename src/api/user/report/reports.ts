import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {ReportApiInput} from '../../../type'
import {logApiUserReply} from '../../../lib/log'

export async function reports(store: MetadataStore, ef: EntityFactory, input: ReportsInput) {
  log('reports %j', input)
  store.reports
}

export type ReportsInput = ReportApiInput

const log = logApiUserReply.extend('reports')
