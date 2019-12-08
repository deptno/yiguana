import {EEntity, EEntityStatus, YiguanaDocument} from '../../type'
import {Member, User} from '../user'
import {keys} from '../../dynamodb/keys'
import {Post} from '../post'
import {Comment, Reply} from '../comment'

export function createReport<T extends Post | Comment | Reply>(params: CreateReportInput<T>): Report {
  const {user, data: {content, data, createdAt, updatedAt}} = params
  const {hk, rk: target} = data
  const {id: userId} = user
  const entity = EEntity.Report
  const rk = keys.rk.report.stringify({entity, target, userId})
  const byUser = keys.byUser.report.stringify({
    entity,
    target,
    createdAt,
  })

  return {
    hk,
    rk,
    userId,
    byUser,
    content,
    data,
    user,
    status: EEntityStatus.requestedBlock,
    createdAt: createdAt!,
    updatedAt: updatedAt!,
  }
}

export type CreateReportInput<T extends Post | Comment | Reply> = {
  data: {
    data: T
    content: string
    createdAt?: string
    updatedAt?: string
  }
  user: Member
}
export interface Report extends YiguanaDocument {
  userId: string
  byUser: string
  content: string
  user: User
  data: Post | Comment | Reply
  status: EEntityStatus
}
