import {MetadataStore} from '../../../store/dynamodb'
import {Comment, EntityFactory, Post} from '../../../entity'
import {ApiInputWithUser} from '../../../type'
import {logApiUserReport as log} from '../../../lib/log'
import {assertsMember} from '../../../lib/assert'

export async function create(store: MetadataStore, ef: EntityFactory, input: ReportApiInput) {
  log('create %j', input)

  assertsMember(input.user)

  const {data, user} = input
  const report = ef.createReport({user, data})
  const reported = await store.report(report)

  if (reported) {
    return store.increaseReportCount(reported)
  }
}

export type ReportApiInput = ApiInputWithUser<{
  data: Comment | Post
  content: string
  createdAt: string
}>
