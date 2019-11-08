import {EEntity} from '../enum'

export type LikeInput = {
  entity: Extract<EEntity, EEntity.Post | EEntity.Comment>
  targetId: string
  createdAt: string
}