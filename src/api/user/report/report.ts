import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {ReportApiInput} from '../../../type'
import {logApiUserReply} from '../../../lib/log'

export async function report(store: MetadataStore, ef: EntityFactory, input: ReportInput) {
  log('report %j', input)

  const {data: {content, data, createdAt}, user} = input
  if (!user) {
    throw new Error('user is required')
  }
  if (!('id' in user)) {
    throw new Error('user.id is required')
  }

  const report = await store.report({
    data: ef.createReport({
      user,
      data: {
        data,
        content,
        createdAt,
      },
    }),
  })

  if (report) {
    return store.increaseReportCount(report)
  }
}

export type ReportInput = ReportApiInput

const log = logApiUserReply.extend('report')
