import {keys} from '../../../../dynamodb/keys'

export function createReportDocument(params: CreateReportInput): Yiguana.ReportDocument {
  const {user, data: {content, data, createdAt, updatedAt}} = params
  const {hk, rk: target} = data
  const {id: userId} = user
  const entity = Yiguana.EntityType.Report
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
    status: Yiguana.EntityStatusType.requestedBlock,
    createdAt: createdAt!,
    updatedAt,
  }
}

export type CreateReportInput = {
  data: {
    data: Yiguana.ReportableEntity
    content: string
    createdAt?: string
    updatedAt?: string
  }
  user: Yiguana.Member
}