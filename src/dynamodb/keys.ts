import {util} from '@deptno/dynamodb'
import {EEntity, EPriority} from '../entity/enum'

const {createKey} = util

const keyHkLike = createKey<{ targetId: string, userId: string }>(
  ['targetId', 'userId'],
  {
    targetId: v => v,
    userId: v => v,
  },
)
const keyLikeLike = createKey<{ userId: string, entity: EEntity, targetId: string, createdAt: string }>(
  ['userId', 'entity', 'targetId', 'createdAt'],
  {
    targetId: v => v,
    entity: v => v,
    userId: v => v,
    createdAt: v => v,
  },
)
const keyOrderPost = createKey<{ entity: EEntity, category: string, createdAt: string}>(
  ['entity', 'category', 'createdAt'],
  {
    entity: v => v as EEntity.Post,
    category: v => v,
    createdAt: v => v,
  },
)
const keyOrderComment = createKey<{ entity: EEntity, priority: EPriority, createdAt: string }>(
  ['entity', 'priority', 'createdAt'],
  {
    entity: v => v as EEntity.Comment,
    priority: v => v as unknown as EPriority,
    createdAt: v => v,
  },
)
const keyOrderReply = createKey<{ entity: EEntity, createdAt: string}>(
  ['entity', 'createdAt'],
  {
    entity: v => v as EEntity.Reply,
    createdAt: v => v,
  },
)
const keyCategoryPost = createKey<{category: string, createdAt: string}>(
  ['category', 'createdAt'],
  {
    category: v => v,
    createdAt: v => v,
  },
)


export const keys = {
  hk: {
    like: keyHkLike, // like get 을 위한 키
  },
  like: {
    like: keyLikeLike, // userId#entity 로 라이크한 객체를 뽑아내는 GSI
  },
  category: {
    post: keyCategoryPost
  },
  order: {
    post: keyOrderPost,
    comment: keyOrderComment,
    reply: keyOrderReply,
  },
}
