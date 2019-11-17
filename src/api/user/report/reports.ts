import {MetadataStore} from '../../../store/dynamodb'
import {Post, Comment, EntityFactory} from '../../../entity'
import {Member} from '../../../entity/user'

export async function reports(store: MetadataStore, ef: EntityFactory, input: ReportsInput) {
  store.reports
}

export type ReportsInput = {
  data: {
    content: string
    data: Post|Comment
    createdAt: string
  }
  user: Member
}
