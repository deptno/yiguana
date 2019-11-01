import {util} from '@deptno/dynamodb'
import {EEntity} from '../entity/enum'

const {createKey} = util

const keyTableLikeHk = createKey<{targetId: string, userId: string}>(
  ['targetId', 'userId'],
  {
    targetId: v => v,
    userId: v => v,
  }
)
const keyGsiLikeLike = createKey<{userId: string, entity: EEntity, targetId: string}>(
  ['userId', 'entity', 'targetId'],
  {
    targetId: v => v,
    entity: v => v,
    userId: v => v,
  }
)

export const keys = {
  hk: {
    like: keyTableLikeHk // like get 을 위한 키
  },
  like: keyGsiLikeLike // userId#entity 로 라이크한 객체를 뽑아내는 GSI
}
