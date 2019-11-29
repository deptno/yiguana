import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {ReportApiInput} from '../../../type'
import {logApiUserComment} from '../../../lib/log'
import {assertNotEmptyString, assertsMember} from '../../../lib/assert'

export async function report(store: MetadataStore, ef: EntityFactory, input: ReportInput) {
  log('report %j', input)

  assertNotEmptyString(input.data.content)
  assertsMember(input.user)

  // TODO: post 와 내용이 중복되는데 이에 대한 해결 레이어가 필요한지
  const {data: {content, data, createdAt}, user} = input
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

const log = logApiUserComment.extend('report')
