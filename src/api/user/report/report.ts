import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {ReportApiInput} from '../../../type'
import {logApiUserReply} from '../../../lib/log'
import {assertsMember} from '../../../lib/assert'

export async function report(store: MetadataStore, ef: EntityFactory, input: ReportInput) {
  log('report %j', input)

  assertsMember(input.user)

  const {data, user} = input
  const report = ef.createReport({user, data})
  const reported = await store.report(report)

  if (reported) {
    return store.increaseReportCount(reported)
  }
}

export type ReportInput = ReportApiInput

const log = logApiUserReply.extend('report')
