import {EEntity} from '../enum'

export type LikeInput = {
  entity: Extract<EEntity, EEntity.Post | EEntity.Comment | EEntity.Reply>
  targetId: string
  createdAt: string
}