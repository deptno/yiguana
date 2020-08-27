import {util} from '@deptno/dynamodb'

const {createKey} = util

export const keys = {
  rk: {
    like: createKey<{entity: Yiguana.EntityType.Like, target: Omit<Yiguana.EntityType, Yiguana.EntityType.Like>, userId: string}>(
      ['entity', 'target', 'userId'],
      {
        entity: v => v,
        target: v => v,
        userId: v => v
      }
    ),
    report: createKey<{entity: Yiguana.EntityType.Report, target: Omit<Yiguana.EntityType, Yiguana.EntityType.Like|Yiguana.EntityType.Report>, userId: string}>(
      ['entity', 'target', 'userId'],
      {
        entity: v => v,
        target: v => v,
        userId: v => v
      }
    ),
    agg: createKey<{agg: Yiguana.EntityType.Agg, type: Yiguana.EntityType.Report, target: Omit<Yiguana.EntityType, Yiguana.EntityType.Like|Yiguana.EntityType.Report>}>(
      ['agg', 'type', 'target'],
      {
        agg: v => v,
        type: v => v,
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
    like: createKey<{ userId: string, entity: Yiguana.EntityType, targetId: string, createdAt: string }>(
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
    post: createKey<{ entity: Yiguana.EntityType, category: string, createdAt: string }>(
      ['entity', 'category', 'createdAt'],
      {
        entity: v => v as Yiguana.EntityType.Post,
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

    post: createKey<{ entity: Yiguana.EntityType, createdAt: string }>(
      ['entity', 'createdAt'],
      {
        entity: v => v as Yiguana.EntityType,
        createdAt: v => v,
      },
    ),
    comment: createKey<{ entity: Yiguana.EntityType, createdAt: string }>(
      ['entity', 'createdAt'],
      {
        entity: v => v as Yiguana.EntityType,
        createdAt: v => v,
      },
    ),

    reply: createKey<{ entity: Yiguana.EntityType, createdAt: string }>(
      ['entity', 'createdAt'],
      {
        entity: v => v as Yiguana.EntityType,
        createdAt: v => v,
      },
    ),
    like: createKey<{ entity: Yiguana.EntityType, createdAt: string }>(
      ['entity', 'createdAt'],
      {
        entity: v => v as Yiguana.EntityType,
        createdAt: v => v,
      },
    ),
    report: createKey<{ entity: Yiguana.EntityType, target?: Yiguana.EntityType.Post|Yiguana.EntityType.Comment, createdAt: string }>(
      ['entity', 'target', 'createdAt'],
      {
        entity: v => v as Yiguana.EntityType,
        target: v => v || '',
        createdAt: v => v,
      },
    ),
  },
  agg: createKey<{ type: Yiguana.EntityType.Report, entity: Yiguana.EntityType.Post|Yiguana.EntityType.Comment}>(
    ['type', 'entity'],
    {
      type: v => Yiguana.EntityType.Report,
      entity: v => v as Yiguana.EntityType.Post|Yiguana.EntityType.Comment,
    },
  ),
}
