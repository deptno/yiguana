import {DynamoDbKey} from '@deptno/dynamodb/dist/key'

class YiguanaIndex<H, R> {
  constructor(
    public readonly indexName: string,
    public hash: DynamoDbKey<H>,
    public range?: DynamoDbKey<R>,
  ) {

  }
}

export enum EIndexName {
  posts = 'posts',
  postsByCategory = 'postsByCategory',
  comments = 'comments',
  byUser = 'byUser',
  reports = 'reports',
}

export enum EEntityStatus {
  requestedBlock = 'requested block',
  blockedByRule = 'blocked by rule',
  deletedByUser = 'deleted by user',
  deletedByAdmin = 'deleted by admin',
  innocent = 'innocent',
  inAudit = 'in audit',
}
