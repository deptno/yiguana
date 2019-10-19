import {EEntity} from '../entity/enum'

export interface YiguanaDocument {
  hk: string
  rk: EEntity
  createdAt: string
  updatedAt?: string
  deleted?: boolean
  order?: string
}
