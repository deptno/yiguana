import {EEntityStatus, YiguanaDocument} from '../../dynamodb'
import {Member, User} from '../user'
import {ReportInput} from './user-input'
import {EEntity} from '../enum'
import {keys} from '../../dynamodb/keys'
import {Post} from '../post'
import {Comment} from '../comment'

export function createReport<T extends Post | Comment>(params: CreateReportInput<T>): Report {
  const {user, data: {content, data, createdAt}} = params
  const {hk: targetId, rk: target} = data
  const {id: userId, ...userOmitId} = user
  const entity = EEntity.Report
  const hk = targetId
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
    createdAt,
    data,
    content,
    user: userOmitId,
    status: EEntityStatus.requestedBlock
  }
}

export type CreateReportInput<T extends Post | Comment> = {
  data: Pick<ReportInput, 'createdAt'> & {
    data: T
    content: string
  }
  user: Member
}
export interface Report extends YiguanaDocument {
  userId: string
  byUser: string
  content: string
  user: Omit<User, 'id'>
  data: Post|Comment
  status: EEntityStatus
}
