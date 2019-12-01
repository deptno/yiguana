
import {EEntity, EEntityStatus} from '../type'

export type YiguanaDocumentHash = { hk: string }
export type YiguanaDocumentHashRange = YiguanaDocumentHash & { rk: EEntity | string }
export interface YiguanaDocument extends YiguanaDocumentHashRange {
  createdAt: string
  updatedAt?: string
  status?: EEntityStatus
}

