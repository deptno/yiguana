import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {Member} from '../../../entity/user'
import {Post} from '../../../entity/post'

export async function report(store: MetadataStore, ef: EntityFactory, input: ReportInput) {
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
    return store.increaseReportCount({data: report})
  }
}

export type ReportInput = {
  data: {
    content: string
    data: Post
    createdAt: string
  }
  user: Member
}
