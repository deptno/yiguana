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
    reportAgg: createKey<{entity: EEntity.AggReport, target: Omit<EEntity, EEntity.Like|EEntity.Report>}>(
      ['entity', 'target'],
      {
        entity: v => v,
        target: v => v,
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
  byUser: createKey<{ entity: EEntity, createdAt: string }>(
    ['entity', 'createdAt'],
    {
      entity: v => v as EEntity,
      createdAt: v => v,
    },
  ),
  agg: createKey<{ aggReport: EEntity.AggReport, entity: Extract<EEntity, EEntity.Post|EEntity.Comment>}>(
    ['aggReport', 'entity'],
    {
      aggReport: v => EEntity.AggReport,
      entity: v => v as Extract<EEntity, EEntity.Post|EEntity.Comment>,
    },
  ),
}
