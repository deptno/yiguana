import {MetadataStore} from '../../../store/dynamodb'
import {Comment, EntityFactory, Post, Reply} from '../../../entity'
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
    // todo: 여기 코드에 에러가 있어서 수정을 했음 이 부분에서 에러가 있었을 꺼 같음
    return store.incReportCount(reported.data)
  }
}

export type ReportApiInput = ApiInputWithUser<{
  data: Post | Comment | Reply
  content: string
  createdAt: string
}>
