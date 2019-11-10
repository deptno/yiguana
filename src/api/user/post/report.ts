import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {Member} from '../../../entity/user'
import {Post} from '../../../entity/post'
import * as R from 'ramda'

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
    //TODO: upsert report 의 count 객체 count + 1
    return store.report({data: report})
  }

  return Promise
    .all([
      store.remove({data}),
      //TODO: report 의 count 객체 count - 1
    ])
    .then<Post>(R.view(R.lensIndex(1)))
}

export type ReportInput = {
  data: {
    content: string
    data: Post
    createdAt: string
  }
  user: Member
}
