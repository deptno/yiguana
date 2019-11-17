import {util} from '@deptno/dynamodb'
import {EEntity} from '../entity/enum'

const {createKey} = util

export const keys = {
  rk: {
    like: createKey<{entity: EEntity.Like, target: Omit<EEntity, EEntity.Like>, userId: string}>(
      ['entity', 'target', 'userId'],
      {
        entity: v => v,
        target: v => v,
        userId: v => v
      }
    ),
    report: createKey<{entity: EEntity.Report, target: Omit<EEntity, EEntity.Like|EEntity.Report>, userId: string}>(
      ['entity', 'target', 'userId'],
      {
        entity: v => v,
        target: v => v,
        userId: v => v
      }
    ),
    agg: createKey<{agg: EEntity.Agg, type: EEntity.Report, target: Omit<EEntity, EEntity.Like|EEntity.Report>, userId: string}>(
      ['agg', 'type', 'target', 'userId'],
      {
        agg: v => v,
        type: v => v,
        target: v => v,
        userId: v => v,
      }
    ),
  },
  hk: {
    like: createKey<{ targetId: string, userId: string }>(
      ['targetId', 'userId'],
      {
        targetId: v => v,
        userId: v => v,
      },
    ), // like get 을 위한 키
  },
  like: {
    like: createKey<{ userId: string, entity: EEntity, targetId: string, createdAt: string }>(
      ['userId', 'entity', 'targetId', 'createdAt'],
      {
        targetId: v => v,
        entity: v => v,
        userId: v => v,
        createdAt: v => v,
      },
    ), // userId#entity 로 라이크한 객체를 뽑아내는 GSI
  },
  category: createKey<{ category: string, createdAt: string }>(
    ['category', 'createdAt'],
    {
      category: v => v,
      createdAt: v => v,
    },
  ),
  order: {
    post: createKey<{ entity: EEntity, category: string, createdAt: string }>(
      ['entity', 'category', 'createdAt'],
      {
        entity: v => v as EEntity.Post,
        category: v => v,
        createdAt: v => v,
      },
    ),
  },
  posts: createKey<{ createdAt: string }>(
    ['createdAt'],
    {
      createdAt: v => v,
    },
  ),
  comments: createKey<{ commentCreatedAt: string, replyCreatedAt?: string }>(
    ['commentCreatedAt', 'replyCreatedAt'],
    {
      commentCreatedAt: v => v,
      replyCreatedAt: v => v,
    },
  ),
  byUser: {

    post: createKey<{ entity: EEntity, createdAt: string }>(
      ['entity', 'createdAt'],
      {
        entity: v => v as EEntity,
        createdAt: v => v,
      },
    ),
    comment: createKey<{ entity: EEntity, createdAt: string }>(
      ['entity', 'createdAt'],
      {
        entity: v => v as EEntity,
        createdAt: v => v,
      },
    ),

    reply: createKey<{ entity: EEntity, createdAt: string }>(
      ['entity', 'createdAt'],
      {
        entity: v => v as EEntity,
        createdAt: v => v,
      },
    ),
    like: createKey<{ entity: EEntity, createdAt: string }>(
      ['entity', 'createdAt'],
      {
        entity: v => v as EEntity,
        createdAt: v => v,
      },
    ),
    report: createKey<{ entity: EEntity, target: EEntity.Post|EEntity.Comment, createdAt: string }>(
      ['entity', 'target', 'createdAt'],
      {
        entity: v => v as EEntity,
        target: v => v,
        createdAt: v => v,
      },
    ),
  },
  agg: createKey<{ type: EEntity.Report, entity: EEntity.Post|EEntity.Comment}>(
    ['type', 'entity'],
    {
      type: v => EEntity.Report,
      entity: v => v as EEntity.Post|EEntity.Comment,
    },
  ),
}
