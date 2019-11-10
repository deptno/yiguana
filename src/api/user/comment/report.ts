import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {Member} from '../../../entity/user'
import {Comment} from '../../../entity/comment'
import * as R from 'ramda'
import {ReportAgg} from '../../../entity/report/report-agg'

export async function report(store: MetadataStore, ef: EntityFactory, input: ReportInput) {
  // TODO: post 와 내용이 중복되는데 이에 대한 해결 레이어가 필요한지
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
    //TODO: upsert report 의 count 객체 count + 1
    return store.increaseReportCount({data: report})
  }

  return Promise
    .all([
      store.remove({data}),
      store.decreaseReportCount({data: report})
    ])
    .then<ReportAgg>(R.view(R.lensIndex(1)))
}

export type ReportInput = {
  data: {
    content: string
    data: Comment
    createdAt: string
  }
  user: Member
}
