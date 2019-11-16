import {EEntity} from '../enum'

export type ReportInput = {
  entity: Extract<EEntity, EEntity.Post | EEntity.Comment>
  targetId: string
  createdAt: string
}